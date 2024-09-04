import React, { useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Sky, KeyboardControls } from "@react-three/drei";
import { Ground } from "./components/Ground";
import { Physics } from "@react-three/rapier";
import { Character } from "./components/Character";
import { Camera } from "./components/Camera";
import { Path } from "./components/Path";
import { CharacterController } from "./components/CharacterController";
import { Jewel } from "./components/Jewel";
import { Barrier, Barriers } from "./components/Barrier";
import { MagicStone, MagicStones } from "./components/MagicStone";
import { Perf } from "r3f-perf";
import { GameProvider } from "./context/Game";

function App() {
  const characterRef = useRef();

  return (
    <div className="App">
      <GameProvider>
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
      </GameProvider>
    </div>
  );
}

export default App;
