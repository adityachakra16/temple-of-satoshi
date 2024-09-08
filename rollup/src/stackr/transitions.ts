import { REQUIRE, STF, Transitions } from "@stackr/sdk/machine";
import { hashMessage } from "ethers";
import { AppState } from "./machine";

export type StartLevelInput = {
  timestamp: number;
  level: number;
  width: number;
  height: number;
  map: string;
};

export type EndLevelInput = {
  timestamp: number;
  levelId: number;
  gameInputs: string;
  respawns: number;
};

const startLevel: STF<AppState, StartLevelInput> = {
  handler: ({ state, inputs, msgSender, block, emit }) => {
    const { width, height, timestamp, level, map } = inputs;

    // Check if game id exists
    const levelId = hashMessage(
      `${msgSender}::${timestamp}::${block.timestamp}::${level}`
    );

    state.games[levelId] = {
      player: String(msgSender),
      level,
      startTime: block.timestamp,
      endTime: 0,
      height,
      width,
      respawns: 0,
      gameInputs: "",
      map: map,
    };

    if (!state.players[msgSender]) {
      state.players[msgSender] = {
        id: msgSender,
        levelsCompleted: 0,
        scores: [],
      };
    }

    emit({
      name: "LevelStarted",
      value: levelId,
    });
    return state;
  },
};

const endLevel: STF<AppState, EndLevelInput> = {
  handler: ({ state, inputs, msgSender, block, emit }) => {
    const { levelId, timestamp, gameInputs, respawns } = inputs;

    // Check if game id exists
    REQUIRE(!!state.games[levelId], "GAME_NOT_FOUND");
    REQUIRE(
      state.games[levelId].player === String(msgSender),
      "INVALID_PLAYER"
    );
    REQUIRE(state.games[levelId].endTime === 0, "INVALID_LEVEL");

    state.games[levelId].endTime = block.timestamp;
    state.games[levelId].respawns = respawns;
    state.games[levelId].gameInputs = gameInputs;

    const game = state.games[levelId];
    const currentLevel = game.level;
    const map = game.map;

    console.log({
      currentLevel,
      map,
      respawns,
    });

    const numBarriers = JSON.parse(map).barriers.length;
    const player = state.players[msgSender];

    state.players[msgSender].levelsCompleted += 1;
    const score = (10 + numBarriers - respawns) * currentLevel;

    if (player.scores.length < currentLevel - 1) {
      state.players[msgSender].scores = player.scores.map((s, i) =>
        i + 1 === currentLevel && s < score ? score : s
      );
    } else {
      state.players[msgSender].scores.push(score);
    }

    console.log({
      players: state.players[msgSender],
      score,
      numBarriers,
      respawns,
      currentLevel,
    });

    emit({
      name: "LevelEnded",
      value: {
        levelId,
        score,
      },
    });

    return state;
  },
};

export const transitions: Transitions<AppState> = {
  startLevel,
  endLevel,
};
