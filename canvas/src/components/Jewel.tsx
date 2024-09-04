// @ts-nocheck
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Jewel(props) {
  const { nodes, materials } = useGLTF("/Jewel.glb");
  return (
    <group position={[90, 2, 90]} scale={0.5} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Jewel_01_Plane.geometry}
        material={materials.Green_Jewel01}
      />
    </group>
  );
}

useGLTF.preload("/Jewel.glb");
