import { createContext, useContext, useEffect, useRef, useState } from "react";

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
  gameState: "notStarted" | "playing" | "won" | "lost" | "completedLevel";
  setGameState: (
    gameState: "notStarted" | "playing" | "won" | "lost" | "completedLevel"
  ) => void;
}

export const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: any) => {
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [map, setMap] = useState({} as MapType);
  const [visibleBarriers, setVisibleBarriers] = useState<boolean[]>([]);
  const [gameState, setGameState] = useState<
    "notStarted" | "playing" | "won" | "lost" | "completedLevel"
  >("notStarted");
  // Create an array of 5 refs

  const fetchMap = () => {
    setMap({
      start: [0, 0],
      end: [9, 9],
      barriers: [
        // [4, 5],
        [2, 2],
        [7, 7],
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
