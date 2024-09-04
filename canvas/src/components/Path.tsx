import React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const path = [
  [0, 0],
  [1, 0],
  [1, 1],
  [2, 1],
  [2, 2],
  [2, 3],
  [3, 3],
  [4, 3],
  [4, 4],
  [4, 5],
  [5, 5],
  [6, 5],
  [6, 6],
  [7, 6],
  [7, 7],
  [8, 7],
  [8, 8],
  [9, 8],
  [9, 9],
];

const PathSegment = ({ position, rotation, length, width }: any) => {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Path */}
      <mesh receiveShadow>
        <boxGeometry args={[length, 0.2, width]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Left Boundary */}
      {/* <mesh position={[-length / 2, 0.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 1, width]} />
        <meshStandardMaterial color="red" />
      </mesh> */}

      {/* Right Boundary */}
      {/* <mesh position={[length / 2, 0.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 1, width]} />
        <meshStandardMaterial color="red" />
      </mesh> */}
    </group>
  );
};

export function Path() {
  const segments = [];
  const length = 10;
  const width = 10;
  for (let i = 0; i < path.length; i++) {
    for (let j = 0; j < 2; j++) {
      // Check if path contains this point
      // console.log("Checking", i, j);
      //   console.log("Path contains", i, j);
      //   segments.push(
      //     <PathSegment
      //       key={i}
      //       position={currentPosition.clone()}
      //       rotation={currentRotation}
      //       length={length}
      //       width={width}
      //     />
      //   );

      segments.push(
        <PathSegment
          key={i}
          position={[path[i][0] * length, 0, path[i][1] * width]}
          rotation={0}
          length={length}
          width={width}
        />
      );
    }
  }

  return <>{segments}</>;
}
