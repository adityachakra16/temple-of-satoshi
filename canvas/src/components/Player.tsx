import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();

export function Player({ lerp = THREE.MathUtils.lerp }) {
  const ref = useRef();
  const gltfModel = useGLTF("/Man.gltf");

  console.log({ gltfModel });
  const rapier = useRapier();
  const [, get] = useKeyboardControls();
  useFrame((state) => {
    const { forward, backward, left, right, jump } = get() as any;
    //   const current = ref.current as any;
    //   if (!current) return;
    //   const velocity = current.linvel();
    //   // update camera
    //   const translation = current.translation();
    //   state.camera.position.set(translation.x, translation.y, translation.z);

    //   // movement
    //   frontVector.set(0, 0, backward - forward);
    //   sideVector.set(left - right, 0, 0);
    //   direction
    //     .subVectors(frontVector, sideVector)
    //     .normalize()
    //     .multiplyScalar(SPEED)
    //     .applyEuler(state.camera.rotation);
    //   current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
  });
  return (
    <RigidBody
      // ref={ref as any}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[0, 10, 0]}
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[0.75, 0.5]} />
    </RigidBody>
  );
}
