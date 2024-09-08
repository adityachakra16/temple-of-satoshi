// @ts-nocheck
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GameContext } from "../context/Game";
import { useContext } from "react";
import { CapsuleCollider } from "@react-three/rapier";
import { BallCollider } from "@react-three/rapier";
import { Vector3 } from "three";
import { CharacterContext } from "../context/Character";

export function Jewel(props) {
  const { nodes, materials } = useGLTF("/Jewel.glb");
  const gameContext = useContext(GameContext);
  const characterContext = useContext(CharacterContext);

  if (!gameContext?.map) return <></>;

  const { map } = gameContext;

  const onCollisionEnter = ({ other }) => {
    if (!characterContext) return;
    gameContext.endCurrentLevel(characterContext.respawnIndex + 1);
  };
  const position = new Vector3(10 * map.end[0], 2, 10 * map.end[1]);
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
        args={[2.5]}
        position={position}
        onIntersectionEnter={onCollisionEnter}
        sensor
      />
    </group>
  );
}

useGLTF.preload("/Jewel.glb");
