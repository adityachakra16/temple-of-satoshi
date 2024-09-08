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
    | "leaderboard";
  setGameState: (
    gameState:
      | "notStarted"
      | "playing"
      | "won"
      | "lost"
      | "completedLevel"
      | "leaderboard"
  ) => void;
  respawn: () => void;
  respawnIndex: number;
  setRespawnIndex: (index: number) => void;
  respawnTimer: number;
  setRespawnTimer: (timer: number) => void;
  currentLevelId: string | null;
  setCurrentLevelId: (levelId: string | null) => void;
  startNewLevel: () => void;
  endCurrentLevel: () => void;
}

export const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: any) => {
  const { startLevel, endLevel } = RollupInterface();
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentLevelId, setCurrentLevelId] = useState<string | null>(null);
  const [map, setMap] = useState({} as MapType);
  const [visibleBarriers, setVisibleBarriers] = useState<boolean[]>([]);
  const [gameState, setGameState] = useState<
    "notStarted" | "playing" | "won" | "lost" | "completedLevel" | "leaderboard"
  >("notStarted");

  // Positions of all the respawning characters
  const [characterMovements, setCharacterMovements] = useState<
    [number, number, number, number][][]
  >([]);
  const [respawnIndex, setRespawnIndex] = useState(0);
  const [respawnTimer, setRespawnTimer] = useState(10);

  const fetchMap = () => {
    setMap({
      start: [0, 0],
      end: [9, 9],
      barriers: [
        // [4, 5],
        [2, 2],
        [7, 8],
      ],
      stones: [
        [2, 2],
        [6, 8],
      ],
      path: [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
        [2, 2],
        [2, 3],
        [3, 3],
        [4, 3],
        [4, 4],
        [4, 5],
        [5, 5],
        [6, 5],
        [6, 6],
        [6, 7],
        [6, 8],
        [7, 8],
        [8, 8],
        [9, 8],
        [9, 9],
      ],
    });
    setVisibleBarriers([true, true]);
  };

  const respawn = () => {
    // Reset the player position
    // Reset the timer
    setRespawnIndex((prev) => prev + 1);
    setRespawnTimer(0);
  };

  const endCurrentLevel = async () => {
    setGameState("completedLevel");
    if (!currentLevelId) return;
    console.log("Ending level", currentLevelId);

    const endLevelRes = await endLevel(currentLevelId);
    if (!endLevelRes) {
      console.error("Error ending level");
      return;
    }
  };

  const startNewLevel = async () => {
    const newLevel = currentLevel + 1;
    const startLevelRes = await startLevel(
      newLevel,
      window.innerWidth,
      window.innerHeight
    );
    console.log({ startLevelRes });
    if (!startLevelRes) {
      console.error("Error starting level");
      return;
    }
    setRespawnIndex(0);
    setRespawnTimer(10);
    setCurrentLevel(newLevel);
    setCurrentLevelId(startLevelRes.levelId);
    setGameState("playing");
  };

  useEffect(() => {
    fetchMap();
  }, [currentLevel]);

  useEffect(() => {
    if (respawnTimer > 0) {
      const timer = setTimeout(() => setRespawnTimer(respawnTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      respawn();
    }
  }, [respawnTimer]);

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
        respawn,
        respawnIndex,
        setRespawnIndex,
        respawnTimer,
        setRespawnTimer,
        currentLevelId,
        setCurrentLevelId,
        startNewLevel,
        endCurrentLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
