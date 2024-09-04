// @ts-nocheck

import React, { useContext, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import { GameContext } from "../context/Game";

export function Barrier({ position = new Vector3(0, 0, 0) }) {
  const { nodes, materials } = useGLTF("/Rocks.glb");
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_4.geometry}
        material={materials.Rock}
        position={[position.x + 2, 0, position.z + 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_1.geometry}
        material={materials.Rock}
        position={[position.x + 4, 0, position.z + 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_2.geometry}
        material={materials.Rock}
        position={[position.x, 0, position.z + 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_3.geometry}
        material={materials.Rock}
        position={[position.x - 2, 0, position.z + 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5.geometry}
        material={materials.Rock}
        position={[position.x - 4, 0, position.z + 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/Rocks.glb");

export function Barriers() {
  const { map } = useContext(GameContext);

  if (!map?.barriers) return <></>;

  console.log(map.barriers);

  return (
    <>
      {map.barriers.map((b, i) => {
        return <Barrier position={new Vector3(b[0] * 10, 0, b[1] * 10)} />;
      })}
    </>
  );
}
