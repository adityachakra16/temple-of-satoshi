import React, { useContext, useRef, useEffect } from "react";
import { GameContext } from "../context/Game";
import { CharacterContext } from "../context/Character";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RigidBody, BallCollider } from "@react-three/rapier";

export const CharacterSouls: React.FC = () => {
  const characterContext = useContext(CharacterContext);
  const soulRefs = characterContext?.soulRefs;
  const frameCountRef = useRef(0);

  useFrame(() => {
    if (!soulRefs) return;

    characterContext.characterMovements.forEach(
      (movementsInCurrentRespawn, index) => {
        const soul = soulRefs.current[index];
        if (!soul || !movementsInCurrentRespawn.length) return;

        // Get the movement for the current frame
        const frameIndex =
          frameCountRef.current % movementsInCurrentRespawn.length;
        const movement = movementsInCurrentRespawn[frameIndex];

        if (movement && movement.position) {
          // Update soul position
          soul.position.copy(movement.position);
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

  useEffect(() => {
    if (!soulRefs) return;

    // Reset the frame count when the respawn index changes
    frameCountRef.current = 0;

    // Reset the position of all souls
    soulRefs.current.forEach((soul) => {
      soul.position.set(0, 0, 0);
    });
  }, [characterContext?.respawnIndex]);

  if (!soulRefs) return null;

  return (
    <>
      {soulRefs.current.map((soul, index) => (
        <RigidBody
          key={index}
          position={soul.position}
          collider={false}
          type="kinematicPosition" // Prevents souls from interacting physically
        >
          <primitive key={index} object={soul} />
          {/* Add a BallCollider as a sensor to allow for collision detection */}
          <BallCollider args={[1]} sensor /> {/* Make it a sensor */}
        </RigidBody>
      ))}
    </>
  );
};
