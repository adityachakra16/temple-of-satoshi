// @ts-nocheck
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GameContext } from "../context/Game";
import { useContext } from "react";
import { CapsuleCollider } from "@react-three/rapier";
import { BallCollider } from "@react-three/rapier";
import { Vector3 } from "three";

export function Jewel(props) {
  const { nodes, materials } = useGLTF("/Jewel.glb");
  const gameContext = useContext(GameContext);

  if (!gameContext?.map) return <></>;

  const { map } = gameContext;

  const onCollisionEnter = ({ other }) => {
    console.log("Jewel collected");
    gameContext.setGameState("completedLevel");
  };
  const position = new Vector3(10 * map.end[0], 2, 10 * map.end[1]);
  console.log("Jewel position", position);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Jewel_01_Plane.geometry}
        material={materials.Green_Jewel01}
        position={position}
        scale={0.5}
      />

      <BallCollider
        args={[5]}
        position={position}
        onIntersectionEnter={onCollisionEnter}
        sensor
      />
    </group>
  );
}

useGLTF.preload("/Jewel.glb");
