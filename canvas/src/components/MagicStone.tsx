// @ts-nocheck

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function MagicStone(props) {
  return (
    <group {...props} dispose={null}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[20, 0.12, 20]}>
        <circleGeometry args={[2, 32]} /> {/* Radius 5, 32 segments */}
        <meshStandardMaterial color="lightgreen" />
      </mesh>
    </group>
  );
}
