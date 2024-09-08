import { useContext } from "react";
import { Vector3 } from "three";
import { GameContext } from "../context/Game";
const PathSegment = ({
  position,
  rotation,
  length,
  width,
  pathExistsOnLeft,
  pathExistsOnRight,
  pathExistsInFront,
  pathExistsBehind,
}: any) => {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Path */}
      <mesh>
        <boxGeometry args={[length, 0.2, width]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Left Boundary */}
      {!pathExistsOnLeft && (
        <mesh position={new Vector3(-length / 2, 0.5, 0)}>
          <boxGeometry args={[0.2, 1, width]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}

      {/* Right Boundary */}
      {!pathExistsOnRight && (
        <mesh position={new Vector3(length / 2, 0.5, 0)}>
          <boxGeometry args={[0.2, 1, width]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}

      {/* Front Boundary */}
      {!pathExistsInFront && (
        <mesh position={new Vector3(0, 0.5, width / 2)}>
          <boxGeometry args={[length, 1, 0.2]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}

      {/* Back Boundary */}
      {!pathExistsBehind && (
        <mesh position={new Vector3(0, 0.5, -width / 2)}>
          <boxGeometry args={[length, 1, 0.2]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}
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
    let boundaryDirection = "length";
    const currPoint = path[i];
    const pathExistsOnLeft = path.some(
      (p) => p[0] === currPoint[0] - 1 && p[1] === currPoint[1]
    );
    const pathExistsOnRight = path.some(
      (p) => p[0] === currPoint[0] + 1 && p[1] === currPoint[1]
    );
    const pathExistsInFront = path.some(
      (p) => p[0] === currPoint[0] && p[1] === currPoint[1] + 1
    );
    const pathExistsBehind = path.some(
      (p) => p[0] === currPoint[0] && p[1] === currPoint[1] - 1
    );

    segments.push(
      <PathSegment
        key={i}
        position={[path[i][0] * length, 0, path[i][1] * width]}
        rotation={0}
        length={length}
        width={width}
        boundary={boundaryDirection}
        pathExistsOnLeft={pathExistsOnLeft}
        pathExistsOnRight={pathExistsOnRight}
        pathExistsInFront={pathExistsInFront}
        pathExistsBehind={pathExistsBehind}
      />
    );
  }

  return <>{segments}</>;
}
