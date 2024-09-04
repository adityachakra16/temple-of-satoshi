// @ts-nocheck

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Barrier(props) {
  const { nodes, materials } = useGLTF("/Rocks.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_4.geometry}
        material={materials.Rock}
        position={[40 + 2, 0, 45]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_1.geometry}
        material={materials.Rock}
        position={[40 + 4, 0, 45]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_2.geometry}
        material={materials.Rock}
        position={[40, 0, 45]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_3.geometry}
        material={materials.Rock}
        position={[40 - 2, 0, 45]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5.geometry}
        material={materials.Rock}
        position={[40 - 4, 0, 45]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/Rocks.glb");
