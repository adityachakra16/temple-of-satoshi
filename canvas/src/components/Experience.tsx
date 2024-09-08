import { KeyboardControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { Camera } from "./Camera";
import { Ground } from "./Ground";
import { Jewel } from "./Jewel";
import { Path } from "./Path";
import { Barriers } from "./Barrier";
import { MagicStones } from "./MagicStone";
import { CharacterController } from "./CharacterController";
import { useContext, useMemo, useRef } from "react";
import { GameContext } from "../context/Game";
import { LoginPage } from "./Login";
import { LevelComplete } from "./LevelCompletion";
import { Leaderboard } from "./Leaderboard";
import { CharacterSouls } from "./CharacterSoul";
import { CharacterProvider } from "../context/Character";
import Timer from "./Timer";
import { Paused } from "./PausedPage";

export function Experience() {
  const characterRef = useRef();

  const gameContext = useContext(GameContext);

  if (!gameContext?.map) return <></>;

  if (gameContext.gameState === "notStarted") {
    return <LoginPage />;
  }

  if (gameContext.gameState === "completedLevel") {
    return <LevelComplete />;
  }

  if (gameContext.gameState === "leaderboard") {
    return <Leaderboard />;
  }

  if (gameContext.gameState === "paused") {
    return <Paused />;
  }
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas shadows style={{ width: "100vw", height: "100vh" }}>
        {/* <Perf position="top-left" /> */}

        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          intensity={0.8}
          position={[100, 100, 100]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={500}
          shadow-camera-left={-200}
          shadow-camera-right={200}
          shadow-camera-top={200}
          shadow-camera-bottom={-200}
        />

        <Physics gravity={[0, -30, 0]}>
          <Path />
          <Ground />
          <Barriers />

          <CharacterProvider>
            <CharacterController />
            <MagicStones
              onCharacterStep={() => {
                console.log("character stepped!!!");
              }}
            />
            <CharacterSouls />
            <Jewel />
          </CharacterProvider>
        </Physics>

        <Camera characterRef={characterRef} />
      </Canvas>
    </KeyboardControls>
  );
}
