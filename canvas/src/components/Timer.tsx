import { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/Game";
import { CharacterContext } from "../context/Character";
import { Html } from "@react-three/drei";

const Timer = ({}: any) => {
  const gameContext = useContext(GameContext);
  const characterContext = useContext(CharacterContext);

  if (!gameContext) return <></>;

  if (!characterContext) return <></>;

  if (gameContext.gameState !== "playing") return <></>;

  return (
    <Html
      fullscreen // Html is used to render standard HTML elements inside the Three.js canvas
    >
      <p
        style={{
          position: "absolute",
          top: "1px",
          left: "10px",
          color: "red",
          fontSize: "24px",

          pointerEvents: "none", // Prevents interfering with 3D interactions
        }}
      >
        {characterContext.respawnTimer} s
      </p>
    </Html>
  );
};

export default Timer;
