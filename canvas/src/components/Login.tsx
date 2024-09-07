import { WALLET_ADAPTERS } from "@web3auth/base";

import { useContext, useEffect } from "react";
import { WalletContext } from "../context/Provider";
import { web3auth } from "../App";
import { GameContext } from "../context/Game";
import { RollupInterface } from "../services/RollupInterface";

export function LoginPage() {
  const walletContext = useContext(WalletContext);
  const gameContext = useContext(GameContext);
  const { startLevel } = RollupInterface();
  useEffect(() => {
    if (!walletContext) return;
    const init = async () => {
      try {
        await web3auth.init();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
          setGameState("playing");
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  if (!walletContext) {
    return <div>waiting for wallet</div>;
  }

  if (!gameContext) {
    return <div>waiting for game</div>;
  }

  const { provider, setProvider, loggedIn, setLoggedIn } = walletContext;
  const { setGameState } = gameContext;

  const login = async () => {
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      console.log("Logged in");
      setLoggedIn(true);
      setGameState("playing");
      await gameContext.startNewLevel();
    }
  };

  return (
    <div className="screen">
      <div className="flex flex-col items-start justify-start">
        <div className="flex flex-row items-center justify-start">
          <p className="text">Welcome to </p>
          <h1 className="header">Temple of Satoshi</h1>
        </div>
        <p className="text">
          You are an adventurer looking to collect a bounty from the temple.
          This bounty is in the form of a jewel. It will unlock unfathomable
          riches and power. You must navigate through the temple, stepping on
          magic stones and opening barriers until you find the jewel.
        </p>
        <p className="text">
          You must try to collect the jewel in the shortest possible time as
          there are other adventurers trying to beat you to it!
        </p>
        <div
          className="flex flex-row 
        "
        >
          <button onClick={login} className="button button-large">
            Get Started
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
