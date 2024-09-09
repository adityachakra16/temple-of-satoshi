import { createContext, useContext, useEffect, useRef, useState } from "react";
import { RollupInterface } from "../services/RollupInterface";
import { GameContext } from "./Game";
import * as THREE from "three";

type MapType = {
  start: [number, number];
  end: [number, number];
  path: [number, number][];
  barriers: [number, number][];
  stones: [number, number][];
};

interface CharacterContextType {
  characterMovements: {
    position: any;
    rotation: number;
    animation: string;
    input: {
      forward: boolean;
      backward: boolean;
      left: boolean;
      right: boolean;
    };
    isClicking: boolean;
  }[][]; // forward, backward, left, right
  setCharacterMovements: (
    movement: {
      position: [number, number];
      rotation: number;
      animation: string;
      input: {
        forward: boolean;
        backward: boolean;
        left: boolean;
        right: boolean;
      };
      isClicking: boolean;
    }[][]
  ) => void;
  recordCharacterMovements: (movement: {
    position: [number, number];
    rotation: number;
    animation: string;
    input: {
      forward: boolean;
      backward: boolean;
      left: boolean;
      right: boolean;
    };
    isClicking: boolean;
  }) => void;
  respawnIndex: number;
  setRespawnIndex: (index: number) => void;
  respawn: () => void;
  respawnTimer: number;
  setRespawnTimer: (timer: number) => void;
  soulRefs: React.MutableRefObject<THREE.Mesh[]>;
  characterRef: React.MutableRefObject<THREE.Mesh | undefined>;
}

export const CharacterContext = createContext<CharacterContextType | null>(
  null
);

export const CharacterProvider = ({ children }: any) => {
  // Positions of all the respawning characters
  const [characterMovements, setCharacterMovements] = useState<
    {
      position: [number, number];
      rotation: number;
      animation: string;
      input: {
        forward: boolean;
        backward: boolean;
        left: boolean;
        right: boolean;
      };
      isClicking: boolean;
    }[][]
  >([]);
  const soulRefs = useRef<THREE.Mesh[]>([]);
  const characterRef = useRef<THREE.Mesh>();
  const [respawnIndex, setRespawnIndex] = useState(0);
  const [respawnTimer, setRespawnTimer] = useState(0);
  const gameContext = useContext(GameContext);
  // x, z, rotation
  const recordCharacterMovements = (movement: {
    position: [number, number];
    rotation: number;
    animation: string;
    input: {
      forward: boolean;
      backward: boolean;
      left: boolean;
      right: boolean;
    };
    isClicking: boolean;
  }) => {
    // console.log("Recording movement", movement);
    if (!gameContext) return;
    setCharacterMovements((prev) => {
      const newMovements = prev.slice();
      newMovements[respawnIndex] = newMovements[respawnIndex] || [];
      newMovements[respawnIndex].push(movement);
      return newMovements;
    });
  };

  const respawn = () => {
    // Reset the player position
    // Reset the timer
    setRespawnIndex((prev) => prev + 1);
    setRespawnTimer(0);
  };

  useEffect(() => {
    if (respawnTimer > 0) {
      const timer = setTimeout(() => setRespawnTimer(respawnTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      respawn();
    }
  }, [respawnTimer]);

  useEffect(() => {
    // Initialize souls
    soulRefs.current = characterMovements.map(() => {
      const geometry = new THREE.ConeGeometry(0.5, 1, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5,
      });
      const soul = new THREE.Mesh(geometry, material);
      return soul;
    });
  }, [respawnIndex]);

  return (
    <CharacterContext.Provider
      value={{
        characterMovements,
        setCharacterMovements,
        recordCharacterMovements,
        respawnIndex,
        setRespawnIndex,
        respawn,
        respawnTimer,
        setRespawnTimer,
        soulRefs,
        characterRef,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
