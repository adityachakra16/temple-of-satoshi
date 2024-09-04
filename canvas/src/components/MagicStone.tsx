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
}) {
  const [color, setColor] = useState("lightgreen");
  const circleRef = useRef();

  const onCollisionEnter = ({ other }: any) => {
    console.log(other);
    if (other.rigidBody && onCharacterStep) {
      setColor("darkgreen");
      onCharacterStep();
    }
  };

  const onCollisionExit = ({ other }: any) => {
    if (other.rigidBody) {
      setColor("lightgreen");
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
  const { map } = gameContext;

  if (!map?.stones) return <></>;

  return (
    <>
      {map.stones.map((s, i) => {
        return (
          <MagicStone
            position={new Vector3(s[0] * 10, 0.2, s[1] * 10)}
            radius={3}
            onCharacterStep={() => onCharacterStep(i)}
          />
        );
      })}
    </>
  );
}
