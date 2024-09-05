import { REQUIRE, STF, Transitions } from "@stackr/sdk/machine";
import { hashMessage } from "ethers";
import { AppState } from "./machine";

export type StartLevelInput = {
  timestamp: number;
  level: number;
  width: number;
  height: number;
};

export type EndLevelInput = {
  timestamp: number;
  levelId: number;
  gameInputs: string;
};

const startLevel: STF<AppState, StartLevelInput> = {
  handler: ({ state, inputs, msgSender, block, emit }) => {
    const { width, height, timestamp, level } = inputs;

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
    };

    emit({
      name: "LevelStarted",
      value: levelId,
    });
    return state;
  },
};

const endLevel: STF<AppState, EndLevelInput> = {
  handler: ({ state, inputs, msgSender, block, emit }) => {
    const { levelId, timestamp, gameInputs } = inputs;

    // Check if game id exists
    REQUIRE(!!state.games[levelId], "GAME_NOT_FOUND");
    REQUIRE(
      state.games[levelId].player === String(msgSender),
      "INVALID_PLAYER"
    );
    REQUIRE(state.games[levelId].endTime === 0, "INVALID_LEVEL");

    state.games[levelId].endTime = block.timestamp;

    emit({
      name: "LevelEnded",
      value: levelId,
    });

    return state;
  },
};

export const transitions: Transitions<AppState> = {
  startLevel,
  endLevel,
};
