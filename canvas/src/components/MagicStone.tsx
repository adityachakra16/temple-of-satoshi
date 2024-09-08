// @ts-nocheck
import React, { useContext, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, Collider, useRapier } from "@react-three/rapier";
import { BallCollider } from "@react-three/rapier";
import { Vector3 } from "three";
import { GameContext } from "../context/Game";
import { CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { CharacterContext } from "../context/Character";

export function MagicStone({
  position = new Vector3(0, 0, 0),
  radius = 1,
  onCharacterStep,
  onCharacterExit,
}) {
  const [color, setColor] = useState("lightgreen");
  const circleRef = useRef();
  const gameContext = useContext(GameContext);
  const characterContext = useContext(CharacterContext);
  const stoneRef = useRef<THREE.Mesh>(null);

  const soulRefs = characterContext?.soulRefs;
  const { characterRef: characterRB } = characterContext; // Access character's RigidBody ref
  const onCollisionEnter = ({ other }: any) => {
    console.log({ other });
    if (other.rigidBody && onCharacterStep) {
      setColor("darkgreen");
      onCharacterStep();
    }
  };

  const onCollisionExit = ({ other }: any) => {
    if (other.rigidBody) {
      setColor("lightgreen");
      if (onCharacterExit) onCharacterExit();
    }
  };

  const checkSoulAndCharacterProximity = () => {
    if (!soulRefs?.current) return;
    let isColliding = false;

    soulRefs.current.forEach((soul: THREE.Mesh) => {
      if (!soul) return;

      const distance = soul.position.distanceTo(position);

      // Collision detected if within a certain range
      if (distance < radius) {
        isColliding = true;
        setColor("darkgreen");
        if (onCharacterStep) onCharacterStep();
      }
    });

    if (characterRB?.current) {
      const characterPosition = new Vector3(
        characterRB.current.translation().x,
        characterRB.current.translation().y,
        characterRB.current.translation().z
      );
      const d = characterPosition.distanceTo(position);

      if (d < radius) {
        isColliding = true;
        setColor("darkgreen");
        if (onCharacterStep) onCharacterStep();
      }
    }

    if (!isColliding) {
      setColor("lightgreen");
      if (onCharacterExit) onCharacterExit();
    }
  };

  useFrame(() => {
    checkSoulAndCharacterProximity(); // Manually check soul proximity every frame
    // checkCharacterProximity(); // Manually check character proximity every frame
  });

  return (
    <>
      <mesh ref={stoneRef} rotation={[-Math.PI / 2, 0, 0]} position={position}>
        <circleGeometry args={[radius, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <BallCollider
        args={[radius]}
        position={position} // Slightly raise the collider above the ground
        onIntersectionEnter={onCollisionEnter}
        onIntersectionExit={onCollisionExit}
        sensor
      />
    </>
  );
}

export function MagicStones({ onCharacterStep }: any) {
  const gameContext = useContext(GameContext);

  if (!gameContext?.map?.stones) return <></>;

  const { setVisibleBarriers } = gameContext;

  return (
    <>
      {gameContext?.map.stones.map((s, i) => {
        return (
          <MagicStone
            key={i}
            position={new Vector3(s[0] * 10, 0.2, s[1] * 10)}
            radius={3}
            onCharacterStep={() => {
              setVisibleBarriers((prev) => {
                const newBarriers = [...prev];
                newBarriers[i] = false;
                return newBarriers;
              });
              onCharacterStep(i);
            }}
            onCharacterExit={() => {
              setVisibleBarriers((prev) => {
                const newBarriers = [...prev];
                newBarriers[i] = true;
                return newBarriers;
              });
            }}
          />
        );
      })}
    </>
  );
}
