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
import { useContext, useRef } from "react";
import { GameContext } from "../context/Game";
import { LoginButton } from "./Login";

export function Experience() {
  const characterRef = useRef();

  const gameContext = useContext(GameContext);

  if (!gameContext?.map) return <></>;

  if (gameContext.gameState === "notStarted") {
    return (
      <div className="start-screen">
        <h1>Find the Magic Stones!</h1>
        <LoginButton />
      </div>
    );
  }

  if (gameContext.gameState === "completedLevel") {
    return (
      <div className="start-screen">
        <h1>{`Level {gameContext.currentLevel} Completed!`}</h1>
        <button onClick={() => gameContext.setGameState("playing")}>
          Next Level
        </button>
      </div>
    );
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
        <Perf position="top-left" />

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
          <CharacterController />
          <Jewel />
          <Barriers />
          <MagicStones
            onCharacterStep={() => {
              console.log("character stepped!!!");
            }}
          />
        </Physics>

        <Camera characterRef={characterRef} />
      </Canvas>
    </KeyboardControls>
  );
}
