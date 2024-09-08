import React, { useContext, useRef, useEffect } from "react";
import { GameContext } from "../context/Game";
import { CharacterContext } from "../context/Character";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const CharacterSouls: React.FC = () => {
  const gameContext = useContext(GameContext);
  const characterContext = useContext(CharacterContext);
  const soulRefs = useRef<THREE.Mesh[]>([]);
  const frameCountRef = useRef(0);

  useEffect(() => {
    if (!characterContext) return;

    // Initialize souls
    soulRefs.current = characterContext.characterMovements.map(() => {
      const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.25, 0.5, 3),
        new THREE.MeshStandardMaterial({
          color: "orange",
          transparent: true,
          opacity: 0.7,
        })
      );
      return mesh;
    });

    // Reset frame count when respawn index changes
    frameCountRef.current = 0;
  }, [characterContext?.respawnIndex]);

  useFrame(() => {
    if (!gameContext || !characterContext) return;

    characterContext.characterMovements.forEach(
      (movementsInCurrentRespawn, index) => {
        const soul = soulRefs.current[index];
        if (!soul || !movementsInCurrentRespawn.length) return;

        // Get the movement for the current frame
        const frameIndex =
          frameCountRef.current % movementsInCurrentRespawn.length;
        const movement = movementsInCurrentRespawn[frameIndex];

        if (movement && soul?.position) {
          // Update soul position
          soul.position.copy(movement.position);
          soul.position.y += 0.25; // Lift the cone slightly above the ground

          // Update soul rotation
          soul.rotation.y = movement.rotation + Math.PI / 2; // Adjust rotation to match character facing direction

          // Optionally, change color or scale based on animation
          if (movement.animation === "CharacterArmature|Run") {
            soul.scale.setScalar(1.2);
          } else if (movement.animation === "CharacterArmature|Walk") {
            soul.scale.setScalar(1);
          } else {
            soul.scale.setScalar(0.8);
          }
        }
      }
    );

    // Increment frame count
    frameCountRef.current++;
  });

  if (!characterContext) return null;

  return (
    <>
      {soulRefs.current.map((soul, index) => (
        <primitive key={index} object={soul} />
      ))}
    </>
  );
};
