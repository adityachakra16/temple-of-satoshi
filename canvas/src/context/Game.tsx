import { createContext, useEffect, useRef, useState } from "react";

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
}

export const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: any) => {
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [map, setMap] = useState({} as MapType);

  // Create an array of 5 refs

  const fetchMap = () => {
    setMap({
      start: [0, 0],
      end: [9, 9],
      barriers: [
        [4, 5],
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
        [7, 6],
        [7, 7],
        [8, 7],
        [8, 8],
        [9, 8],
        [9, 9],
      ],
    });
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
