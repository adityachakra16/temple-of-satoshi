import { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/Game";

const Timer = ({ duration, onTimeUp }: any) => {
  const gameContext = useContext(GameContext);

  if (!gameContext) return <></>;

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        color: "white",
        fontSize: "24px",
      }}
    >
      {gameContext.respawnTimer} s
    </div>
  );
};

export default Timer;
