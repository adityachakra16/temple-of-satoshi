// @ts-nocheck

import React, { useContext, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import { GameContext } from "../context/Game";
import { useSpring, animated } from "@react-spring/three";
import { useState } from "react";

export function Barrier({ position = new Vector3(0, 0, 0), visible = true }) {
  const { nodes, materials } = useGLTF("/Rocks.glb");
  console.log({
    position,
    visible,
  });
  const { scale } = useSpring({
    scale: visible ? [100, 100, 100] : [0, 0, 0],
    config: { tension: 300, friction: 30 },
  });
  return (
    <group dispose={null}>
      <animated.mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_4.geometry}
        material={materials.Rock}
        position={[position.x + 2, 0, position.z + 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={scale}
      />
      <animated.mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_1.geometry}
        material={materials.Rock}
        position={[position.x + 4, 0, position.z + 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={scale}
      />
      <animated.mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_2.geometry}
        material={materials.Rock}
        position={[position.x, 0, position.z + 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={scale}
      />
      <animated.mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_3.geometry}
        material={materials.Rock}
        position={[position.x - 2, 0, position.z + 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={scale}
      />
      <animated.mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5.geometry}
        material={materials.Rock}
        position={[position.x - 4, 0, position.z + 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={scale}
      />
    </group>
  );
}

useGLTF.preload("/Rocks.glb");

export function Barriers() {
  const gameContext = useContext(GameContext);

  if (!gameContext?.map?.barriers) return <></>;

  const { visibleBarriers } = gameContext;
  console.log({ visibleBarriers });
  return (
    <>
      {gameContext?.map.barriers.map((b, i) => {
        const visible = visibleBarriers[i];
        return (
          <Barrier
            position={new Vector3(b[0] * 10, 0, b[1] * 10)}
            visible={visible}
          />
        );
      })}
    </>
  );
}
