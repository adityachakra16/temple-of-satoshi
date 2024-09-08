import { useContext } from "react";
import { GameContext } from "../context/Game";
import { RollupInterface } from "../services/RollupInterface";

export function Paused(props: any) {
  const gameContext = useContext(GameContext);
  if (!gameContext?.map) return <></>;

  return (
    <div className="screen">
      <div className="flex flex-col items-start justify-start">
        <p className="text">
          Your game on level {gameContext.currentLevel} is paused.
        </p>
      </div>
    </div>
  );
}
