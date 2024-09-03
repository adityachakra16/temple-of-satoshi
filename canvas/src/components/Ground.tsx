import React from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import grass from "../assets/grass.jpg";
import * as THREE from "three";

export const Ground = (props: any) => {
  const texture = useTexture(grass);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <RigidBody {...props} type="fixed" colliders={false}>
      <mesh
        // scale={1}
        position={[0, 0, 0]}
        receiveShadow
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial map={texture} map-repeat={[240, 240]} />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  );
};
