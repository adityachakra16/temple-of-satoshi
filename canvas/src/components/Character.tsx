import React, { useRef, useState } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { AnimationAction, SkinnedMesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

export const Character = React.forwardRef((props, ref) => {
  const group = useRef() as any;
  const { nodes, materials, animations } = useGLTF("/Man.glb");
  const { actions } = useAnimations(animations, group);
  console.log({ actions });

  const [velocity] = useState(() => new Vector3());
  const [sub, get] = useKeyboardControls() as any;
  const [currentAction, setCurrentAction] = useState<AnimationAction | null>(
    null
  );

  const playAction = (actionName: string) => {
    if (currentAction === actions[actionName]) return;

    if (currentAction) {
      currentAction.fadeOut(0.2); // Smooth transition between actions
    }

    const newAction = actions[actionName] as AnimationAction;
    newAction.reset().fadeIn(0.2).play();
    setCurrentAction(newAction);
  };

  useFrame(() => {
    if (!group.current) return;
    const controls = get();

    if (
      controls.forward ||
      controls.backward ||
      controls.left ||
      controls.right
    ) {
      console.log("controls", controls);
    }
    const direction = new Vector3(
      controls.forward ? 1 : controls.backward ? -1 : 0,
      0,
      controls.left ? 1 : controls.right ? -1 : 0
    );

    direction.normalize().multiplyScalar(0.1);
    velocity.lerp(direction, 0.1);
    (group.current as any).position.add(velocity);

    if (direction.length() > 0) {
      if (velocity.length() > 0.08) {
        playAction("HumanArmature|Man_Run");
      } else {
        playAction("HumanArmature|Man_Walk");
      }
      group.current.rotation.y = Math.atan2(direction.x, direction.z);
    } else {
      playAction("HumanArmature|Man_Idle"); // Idle animation when not moving
    }
  });

  return (
    <group ref={ref as any} {...props} dispose={null}>
      <group ref={group} name="Root_Scene">
        <group name="RootNode">
          <group
            name="HumanArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Bone} />
          </group>
          <group name="BaseHuman" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="BaseHuman_1"
              geometry={(nodes.BaseHuman_1 as SkinnedMesh).geometry}
              material={materials.Shirt}
              skeleton={(nodes.BaseHuman_1 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="BaseHuman_2"
              geometry={(nodes.BaseHuman_2 as SkinnedMesh).geometry}
              material={materials.Skin}
              skeleton={(nodes.BaseHuman_2 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="BaseHuman_3"
              geometry={(nodes.BaseHuman_3 as SkinnedMesh).geometry}
              material={materials.Pants}
              skeleton={(nodes.BaseHuman_3 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="BaseHuman_4"
              geometry={(nodes.BaseHuman_4 as SkinnedMesh).geometry}
              material={materials.Eyes}
              skeleton={(nodes.BaseHuman_4 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="BaseHuman_5"
              geometry={(nodes.BaseHuman_5 as SkinnedMesh).geometry}
              material={materials.Socks}
              skeleton={(nodes.BaseHuman_5 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="BaseHuman_6"
              geometry={(nodes.BaseHuman_6 as SkinnedMesh).geometry}
              material={materials.Hair}
              skeleton={(nodes.BaseHuman_6 as SkinnedMesh).skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
});
useGLTF.preload("/Man.glb");
