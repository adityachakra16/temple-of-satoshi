import { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/Game";

const Timer = ({}: any) => {
  const gameContext = useContext(GameContext);

  if (!gameContext) return <></>;

  if (gameContext.gameState !== "playing") return <></>;

  return (
    <p
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        color: "red",
        fontSize: "24px",
      }}
    >
      {gameContext.respawnTimer} s
    </p>
  );
};

export default Timer;
