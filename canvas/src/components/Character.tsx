import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { AnimationAction, SkinnedMesh } from "three";

export function Character({ animation, ...props }: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/Adventurer.glb");
  const { actions } = useAnimations(animations, group);
  console.log({ actions });
  useEffect(() => {
    if (!animation) return;
    actions[animation]?.reset().fadeIn(0.24).play();

    return () => {
      (actions[animation] as AnimationAction).fadeOut(0.24);
    };
  }, [animation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} />
          </group>
          <group
            name="Adventurer_Feet"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="Adventurer_Feet_1"
              geometry={(nodes.Adventurer_Feet_1 as SkinnedMesh).geometry}
              material={materials.Black}
              skeleton={(nodes.Adventurer_Feet_1 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Adventurer_Feet_2"
              geometry={(nodes.Adventurer_Feet_2 as SkinnedMesh).geometry}
              material={materials.Grey}
              skeleton={(nodes.Adventurer_Feet_2 as SkinnedMesh).skeleton}
            />
          </group>
          <group
            name="Adventurer_Legs"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="Adventurer_Legs_1"
              geometry={(nodes.Adventurer_Legs_1 as SkinnedMesh).geometry}
              material={materials.Brown2}
              skeleton={(nodes.Adventurer_Legs_1 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Adventurer_Legs_2"
              geometry={(nodes.Adventurer_Legs_2 as SkinnedMesh).geometry}
              material={materials.Brown}
              skeleton={(nodes.Adventurer_Legs_2 as SkinnedMesh).skeleton}
            />
          </group>
          <group
            name="Adventurer_Body"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="Adventurer_Body_1"
              geometry={(nodes.Adventurer_Body_1 as SkinnedMesh).geometry}
              material={materials.Green}
              skeleton={(nodes.Adventurer_Body_1 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Adventurer_Body_2"
              geometry={(nodes.Adventurer_Body_2 as SkinnedMesh).geometry}
              material={materials.LightGreen}
              skeleton={(nodes.Adventurer_Body_2 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Adventurer_Body_3"
              geometry={(nodes.Adventurer_Body_3 as SkinnedMesh).geometry}
              material={materials.Skin}
              skeleton={(nodes.Adventurer_Body_3 as SkinnedMesh).skeleton}
            />
          </group>
          <group
            name="Adventurer_Head"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="Adventurer_Head_1"
              geometry={(nodes.Adventurer_Head_1 as SkinnedMesh).geometry}
              material={materials.Skin}
              skeleton={(nodes.Adventurer_Head_1 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Adventurer_Head_2"
              geometry={(nodes.Adventurer_Head_2 as SkinnedMesh).geometry}
              material={materials.Eyebrows}
              skeleton={(nodes.Adventurer_Head_2 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Adventurer_Head_3"
              geometry={(nodes.Adventurer_Head_3 as SkinnedMesh).geometry}
              material={materials.Eye}
              skeleton={(nodes.Adventurer_Head_3 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Adventurer_Head_4"
              geometry={(nodes.Adventurer_Head_4 as SkinnedMesh).geometry}
              material={materials.Hair}
              skeleton={(nodes.Adventurer_Head_4 as SkinnedMesh).skeleton}
            />
          </group>
          <group
            name="Backpack"
            position={[0, 1.373, -0.117]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={26.077}
          >
            <skinnedMesh
              name="Backpack_1"
              geometry={(nodes.Backpack_1 as SkinnedMesh).geometry}
              material={materials.Brown}
              skeleton={(nodes.Backpack_1 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Backpack_2"
              geometry={(nodes.Backpack_2 as SkinnedMesh).geometry}
              material={materials.Green}
              skeleton={(nodes.Backpack_2 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Backpack_3"
              geometry={(nodes.Backpack_3 as SkinnedMesh).geometry}
              material={materials.LightGreen}
              skeleton={(nodes.Backpack_3 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Backpack_4"
              geometry={(nodes.Backpack_4 as SkinnedMesh).geometry}
              material={materials.Gold}
              skeleton={(nodes.Backpack_4 as SkinnedMesh).skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}
useGLTF.preload("/Man.glb");
