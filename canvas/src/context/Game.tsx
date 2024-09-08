import { createContext, useContext, useEffect, useRef, useState } from "react";
import { RollupInterface } from "../services/RollupInterface";

type MapType = {
  start: [number, number];
  end: [number, number];
  path: [number, number][];
  barriers: [number, number][];
  stones: [number, number][];
};

interface GameContextType {
  score: number;
  setScore: (score: number) => void;
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  map: MapType;
  visibleBarriers: boolean[];
  setVisibleBarriers: (visibleBarriers: boolean[]) => void;
  gameState:
    | "notStarted"
    | "playing"
    | "won"
    | "lost"
    | "completedLevel"
    | "leaderboard"
    | "paused";
  setGameState: (
    gameState:
      | "notStarted"
      | "playing"
      | "won"
      | "lost"
      | "completedLevel"
      | "leaderboard"
      | "paused"
  ) => void;
  currentLevelId: string | null;
  setCurrentLevelId: (levelId: string | null) => void;
  startNewLevel: () => void;
  endCurrentLevel: (respawns: number) => void;
  startAgain: () => void;
}

export const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: any) => {
  const { startLevel, endLevel, generateMap } = RollupInterface();
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentLevelId, setCurrentLevelId] = useState<string | null>(null);
  const [map, setMap] = useState({} as MapType);
  const [visibleBarriers, setVisibleBarriers] = useState<boolean[]>([]);
  const [gameState, setGameState] = useState<
    | "notStarted"
    | "playing"
    | "won"
    | "lost"
    | "completedLevel"
    | "leaderboard"
    | "paused"
  >("notStarted");

  const fetchMap = async () => {
    const map = await generateMap(currentLevel);
    setMap(map);
    setVisibleBarriers(map.barriers.map(() => true));

    return map;
  };

  const endCurrentLevel = async (respawns: number) => {
    setGameState("completedLevel");
    if (!currentLevelId) return;
    console.log("Ending level", currentLevelId);

    const endLevelRes = await endLevel(currentLevelId, respawns);
    if (!endLevelRes) {
      console.error("Error ending level");
      return;
    }
  };

  const startNewLevel = async () => {
    const newLevel = currentLevel + 1;
    const generatedMap = await fetchMap();
    const startLevelRes = await startLevel(
      newLevel,
      window.innerWidth,
      window.innerHeight,
      generatedMap
    );
    console.log({ startLevelRes });
    if (!startLevelRes) {
      console.error("Error starting level");
      return;
    }
    setCurrentLevel(newLevel);
    setCurrentLevelId(startLevelRes.levelId);
    setGameState("playing");
  };

  const startAgain = async () => {
    const startLevelRes = await startLevel(
      currentLevel,
      window.innerWidth,
      window.innerHeight,
      map
    );
    console.log({ startLevelRes });
    if (!startLevelRes) {
      console.error("Error starting level");
      return;
    }
    setCurrentLevelId(startLevelRes.levelId);
    setGameState("playing");
  };

  useEffect(() => {
    fetchMap();
  }, [currentLevel]);

  return (
    <GameContext.Provider
      value={{
        score,
        setScore,
        currentLevel,
        setCurrentLevel,
        map,
        visibleBarriers,
        setVisibleBarriers,
        gameState,
        setGameState,
        currentLevelId,
        setCurrentLevelId,
        startNewLevel,
        endCurrentLevel,
        startAgain,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
