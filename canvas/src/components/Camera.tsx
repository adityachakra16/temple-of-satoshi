import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export const Camera = ({ characterRef }: any) => {
  const { camera } = useThree();
  const cameraOffset = new Vector3(0, 5, 10); // Positioning camera behind and above the character
  useFrame(() => {
    if (!characterRef.current) return;

    const targetPosition = characterRef.current.position
      .clone()
      .add(cameraOffset);
    camera.position.lerp(targetPosition, 0.1);
    camera.lookAt(characterRef.current.position);
  });

  return null;
};
