// @ts-nocheck
import React, { useContext, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, Collider, useRapier } from "@react-three/rapier";
import { BallCollider } from "@react-three/rapier";
import { Vector3 } from "three";
import { GameContext } from "../context/Game";
import { CuboidCollider } from "@react-three/rapier";

export function MagicStone({
  position = new Vector3(0, 0, 0),
  radius = 1,
  onCharacterStep,
  onCharacterExit,
}) {
  const [color, setColor] = useState("lightgreen");
  const circleRef = useRef();

  const onCollisionEnter = ({ other }: any) => {
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

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
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
