import React, { useContext } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { GameContext } from "../context/Game";

const PathSegment = ({
  position,
  rotation,
  length,
  width,
  boundary = "length",
}: any) => {
  const leftBoundaryPosition =
    boundary === "length"
      ? new Vector3(-length / 2, 0.5, 0)
      : new Vector3(0, 0.5, -width / 2);
  const rightBoundaryPosition =
    boundary === "width"
      ? new Vector3(length / 2, 0.5, 0)
      : new Vector3(0, 0.5, width / 2);

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Path */}
      <mesh>
        <boxGeometry args={[length, 0.2, width]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Left Boundary */}
      <mesh position={leftBoundaryPosition}>
        <boxGeometry
          args={boundary === "length" ? [0.2, 1, width] : [length, 1, 0.2]}
        />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Right Boundary */}
      <mesh position={rightBoundaryPosition}>
        <boxGeometry
          args={boundary === "width" ? [0.2, 1, width] : [length, 1, 0.2]}
        />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
};

export function Path() {
  const gameContext = useContext(GameContext);

  if (!gameContext?.map?.path) return <></>;

  const path = gameContext.map.path;

  const segments = [];
  const length = 10;
  const width = 10;
  for (let i = 0; i < path.length; i++) {
    // smartly pick if boundary should be along length or width - based on the direction of the path

    // const prevPoint = path[i - 1];
    // const currPoint = path[i];

    // // Determine the direction of the path segment
    // const isHorizontal = currPoint[0] !== prevPoint[0];
    // const boundaryDirection = isHorizontal ? "width" : "length";
    let boundaryDirection = "length";
    if (i > 0) {
      const prevPoint = path[i - 1];
      const currPoint = path[i];
      boundaryDirection = currPoint[0] !== prevPoint[0] ? "width" : "length";
    }

    segments.push(
      <PathSegment
        key={i}
        position={[path[i][0] * length, 0, path[i][1] * width]}
        rotation={0}
        length={length}
        width={width}
        boundary={boundaryDirection}
      />
    );
  }

  return <>{segments}</>;
}
