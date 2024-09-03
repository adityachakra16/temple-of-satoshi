import React from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei";
import { Ground } from "./components/Ground";
import { Physics } from "@react-three/rapier";
import { Character } from "./components/Character";

function App() {
  return (
    <div className="App">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          shadows
          camera={{ fov: 45, position: [0, 10, 10] }}
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          {/* Skybox for a natural-looking environment */}
          <Sky sunPosition={[100, 20, 100]} />

          {/* Ambient light for general illumination */}
          <ambientLight intensity={0.4} />

          {/* Directional light acting like sunlight */}
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

          {/* Point light for additional highlights */}
          <pointLight castShadow intensity={0.8} position={[50, 100, 50]} />

          {/* Physics and scene objects */}
          <Physics gravity={[0, -30, 0]}>
            <Ground />
            <Character />
          </Physics>

          {/* Camera control for FPS-style movement */}
          <PointerLockControls />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default App;
