import { useRef } from "react";

import { RigidBody } from "@react-three/rapier";

export const Guidepost = (props: any) => {
  const ref = useRef();

  return (
    <RigidBody {...props} type="fixed" colliders="cuboid" ref={ref}></RigidBody>
  );
};
