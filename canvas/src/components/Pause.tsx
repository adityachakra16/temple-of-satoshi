import { useContext } from "react";
import { WalletContext } from "../context/Provider";
import { GameContext } from "../context/Game";

const PauseButton = ({ onLogout }: any) => {
  const gameContext = useContext(GameContext);

  if (gameContext === undefined) return <></>;

  return (
    <button
      onClick={() => {
        if (!gameContext) return;
        gameContext.setGameState("paused");
      }}
      style={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        padding: "10px 20px",
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Pause
    </button>
  );
};

export default PauseButton;
