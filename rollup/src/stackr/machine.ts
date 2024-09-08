import { State, StateMachine } from "@stackr/sdk/machine";
import { keccak256, solidityPackedKeccak256, ZeroHash } from "ethers";
import { MerkleTree } from "merkletreejs";
import genesisState from "../../genesis-state.json";
import { transitions } from "./transitions";

// Define and export the State Machine
// this will require State class, Transitions, and genesis state

interface LevelState {
  startTime: number;
  endTime: number;
  player: string;
  height: number;
  width: number;
  level: number;
  respawns: number;
  gameInputs: string;
  map: string;
}

interface PlayerState {
  id: string;
  levelsCompleted: number;
  scores: number[];
}

interface RawState {
  games: Array<LevelState & { id: string }>;
  players: Array<PlayerState>;
}

interface WrappedState {
  games: Record<string, LevelState>;
  players: Record<string, PlayerState>;
}

export class AppState extends State<RawState, WrappedState> {
  constructor(state: RawState) {
    super(state);
  }

  transformer() {
    return {
      wrap: () => {
        const games = this.state.games.reduce<WrappedState["games"]>(
          (acc, game) => {
            const { id, ...rest } = game;
            acc[id] = { ...rest };
            return acc;
          },
          {}
        );
        const players = this.state.players.reduce<WrappedState["players"]>(
          (acc, player) => {
            acc[player.id] = { ...player };
            return acc;
          },
          {}
        );
        return { games, players };
      },
      unwrap: (wrappedState: WrappedState) => {
        const games = Object.keys(wrappedState.games).map((id) => ({
          id,
          player: wrappedState.games[id].player,
          startTime: wrappedState.games[id].startTime,
          endTime: wrappedState.games[id].endTime,
          level: wrappedState.games[id].level,
          height: wrappedState.games[id].height,
          width: wrappedState.games[id].width,
          respawns: wrappedState.games[id].respawns,
          gameInputs: wrappedState.games[id].gameInputs,
          map: wrappedState.games[id].map,
        }));
        const players = Object.keys(wrappedState.players).map((id) => ({
          id,
          levelsCompleted: wrappedState.players[id].levelsCompleted,
          scores: wrappedState.players[id].scores,
        }));

        return { games, players };
      },
    };
  }

  getRootHash(): string {
    const gameLeaves = this.state.games.map(
      ({
        id,
        player,
        startTime,
        endTime,
        height,
        width,
        level,
        respawns,
        gameInputs,
        map,
      }) =>
        solidityPackedKeccak256(
          [
            "string",
            "address",
            "uint256",
            "uint256",
            "uint256",
            "uint256",
            "uint256",
            "uint256",
            "string",
            "string",
          ],
          [
            id,
            player,
            startTime,
            endTime,
            height,
            width,
            level,
            respawns,
            gameInputs,
            map,
          ]
        )
    );
    const playerLeaves = this.state.players.map(
      ({ id, levelsCompleted, scores }) =>
        solidityPackedKeccak256(
          ["string", "uint256", "uint256[]"],
          [id, levelsCompleted, scores]
        )
    );

    const leaves = [...gameLeaves, ...playerLeaves];
    if (leaves.length === 0) {
      return ZeroHash;
    }

    const tree = new MerkleTree(leaves, keccak256);
    return tree.getHexRoot();
  }
}

const MACHINE_ID = "worldEngine";
const machine = new StateMachine({
  id: MACHINE_ID,
  stateClass: AppState,
  initialState: genesisState.state,
  on: transitions,
});

export { machine, MACHINE_ID };
