import { useContext } from "react";
import { GameContext } from "../context/Game";
import { RollupInterface } from "../services/RollupInterface";

export function LevelComplete(props: any) {
  const gameContext = useContext(GameContext);
  const { endLevel, startLevel } = RollupInterface();
  if (!gameContext?.map) return <></>;

  return (
    <div className="screen">
      <div className="flex flex-col items-start justify-start">
        <div className="flex flex-row items-center justify-start">
          <h1 className="header">Congrats!</h1>
        </div>
        <p className="text">
          You have successfully completed level {gameContext.currentLevel}.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <button
            className="button button-large"
            onClick={async () => {
              await gameContext.startNewLevel();
            }}
          >
            Next Level
          </button>
          <button
            className="button button-large button-secondary"
            onClick={() => gameContext.setGameState("leaderboard")}
          >
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
