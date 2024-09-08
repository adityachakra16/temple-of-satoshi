// @ts-nocheck

import { Key, useContext, useState } from "react";
import { GameContext } from "../context/Game";
import { Mesh } from "three";
import { useRef, useEffect, createRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CharacterContext } from "../context/Character";

export const CharacterSouls = () => {
  const gameContext = useContext(GameContext);
  const characterContext = useContext(CharacterContext);
  const [meshRefs, setMeshRefs] = useState<(React.RefObject<Mesh> | null)[]>(
    []
  );

  useEffect(() => {
    if (!gameContext || !characterContext) return;

    // create or update refs for each respawn index
    const meshRefs = characterContext.characterMovements.map(() =>
      createRef<Mesh>()
    );
    setMeshRefs(meshRefs);
  }, [gameContext?.respawnIndex]);

  useFrame(() => {
    if (!gameContext || !meshRefs?.length || !characterContext) return;

    characterContext.characterMovements.forEach(
      (movementsInCurrentRespawn: any, index: Key | null | undefined) => {
        if (!meshRefs[index]?.current) return;
        const mesh = meshRefs[index].current;
        if (!mesh) return;

        const [forward, backward, left, right] = movementsInCurrentRespawn;
        const x = right - left;
        const z = forward - backward;
        mesh.position.x += x;
        mesh.position.z += z;

        // update the character's rotation
        const angle = Math.atan2(z, x);
        mesh.rotation.y = angle;
      }
    );
  });

  if (!characterContext) return <></>;

  return (
    <>
      {characterContext.characterMovements.map(
        (movementsInCurrentRespawn: any, index: Key | null | undefined) => {
          return (
            <mesh ref={meshRefs[index]} position={[0, 0, 0]}>
              <coneGeometry args={[2, 5, 30]} /> {/* Triangle shape */}
              <meshStandardMaterial color="orange" />
            </mesh>
          );
        }
      )}
    </>
  );
};
