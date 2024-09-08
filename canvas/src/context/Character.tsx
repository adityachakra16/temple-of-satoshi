import { createContext, useContext, useEffect, useRef, useState } from "react";
import { RollupInterface } from "../services/RollupInterface";
import { GameContext } from "./Game";

type MapType = {
  start: [number, number];
  end: [number, number];
  path: [number, number][];
  barriers: [number, number][];
  stones: [number, number][];
};

interface CharacterContextType {
  characterMovements: [number, number, number, number][][]; // forward, backward, left, right
  setCharacterMovements: (
    movement: [number, number, number, number][][]
  ) => void;
  recordCharacterMovements: (
    movement: [number, number, number, number]
  ) => void;
}

export const CharacterContext = createContext<CharacterContextType | null>(
  null
);

export const CharacterProvider = ({ children }: any) => {
  // Positions of all the respawning characters
  const [characterMovements, setCharacterMovements] = useState<
    [number, number, number, number][][]
  >([]);
  const gameContext = useContext(GameContext);
  // x, z, rotation
  const recordCharacterMovements = (
    movement: [number, number, number, number]
  ) => {
    // console.log("Recording movement", movement);
    if (!gameContext) return;
    const { respawnIndex } = gameContext;
    setCharacterMovements((prev) => {
      const newMovements = prev.slice();
      newMovements[respawnIndex] = newMovements[respawnIndex] || [];
      newMovements[respawnIndex].push(movement);
      return newMovements;
    });
  };

  return (
    <CharacterContext.Provider
      value={{
        characterMovements,
        setCharacterMovements,
        recordCharacterMovements,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
