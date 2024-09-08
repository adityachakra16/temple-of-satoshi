// @ts-nocheck

import React, { useContext, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import { GameContext } from "../context/Game";
import { useSpring, animated } from "@react-spring/three";
import { useState } from "react";
import { RigidBody } from "@react-three/rapier";

export function Barrier({
  position = new Vector3(0, 0, 0),
  visible = true,
  rotation = false,
}) {
  const { nodes, materials } = useGLTF("/Rocks.glb");
  const { scale } = useSpring({
    scale: visible ? [100, 100, 100] : [0, 0, 0],
    config: { tension: 300, friction: 30 },
  });
  return (
    <group dispose={null}>
      {["Rock_4", "Rock_1", "Rock_2", "Rock_3", "Rock_5"].map((rock, index) => (
        <RigidBody key={index} type="fixed" enabled={visible}>
          <animated.mesh
            castShadow
            receiveShadow
            geometry={nodes[rock].geometry}
            material={materials.Rock}
            position={
              rotation
                ? [position.x + 5, 0, position.z + (index - 2) * 2]
                : [position.x + (index - 2) * 2, 0, position.z + 5]
            }
            rotation={[-Math.PI / 2, 0, 0]}
            scale={scale}
          />
        </RigidBody>
      ))}
    </group>
  );
}

useGLTF.preload("/Rocks.glb");

export function Barriers() {
  const gameContext = useContext(GameContext);

  if (!gameContext?.map?.barriers) return <></>;

  const { visibleBarriers, map } = gameContext;

  const { path } = map;
  const isPathAt = (x, z) => path.some((p) => p[0] === x && p[1] === z);
  console.log("barrier");
  return (
    <>
      {gameContext?.map.barriers.map((b, i) => {
        const visible = visibleBarriers[i];

        const pathExistsOnLeft = isPathAt(b[0] - 1, b[1]);
        const pathExistsOnRight = isPathAt(b[0] + 1, b[1]);
        const pathExistsInFront = isPathAt(b[0], b[1] + 1);
        const pathExistsBehind = isPathAt(b[0], b[1] - 1);

        let rotation = false;
        if (pathExistsOnLeft && pathExistsOnRight) {
          // Path is to the left and right, barrier should rotate along Z-axis
          rotation = true;
        }
        return (
          <Barrier
            key={i}
            position={new Vector3(b[0] * 10, 0, b[1] * 10)}
            visible={visible}
            rotation={rotation}
          />
        );
      })}
    </>
  );
}
