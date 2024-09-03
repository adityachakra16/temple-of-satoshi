import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkinnedMesh } from "three";

export function Character(props: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/Man.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
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
}

useGLTF.preload("/Man.glb");
