import {
  CHAIN_NAMESPACES,
  IProvider,
  WALLET_ADAPTERS,
  UX_MODE,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";

import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/Provider";
import { web3auth } from "../App";
import { GameContext } from "../context/Game";

export function LoginButton() {
  const walletContext = useContext(WalletContext);
  const gameContext = useContext(GameContext);

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
    }
  };

  return (
    <button onClick={login} className="card">
      Login
    </button>
  );
}
