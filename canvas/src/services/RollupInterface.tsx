import { useContext } from "react";
import { WalletContext } from "../context/Provider";
import { GlobalContext } from "../context/Global";
import { ethers } from "ethers";
import { IProvider } from "@web3auth/base";

export const RollupInterface = () => {
  const walletContext = useContext(WalletContext);
  const globalContext = useContext(GlobalContext);

  const getInfo = async () => {
    try {
      const res = await fetch("http://localhost:3210/info");
      const data = await res.json();
      console.log({
        info: data,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const submitAction = async (transition: string, inputs: any) => {
    try {
      if (!walletContext || !globalContext) return;
      const { mruInfo } = globalContext;
      const { provider } = walletContext;

      const domain = mruInfo.domain;
      const types = mruInfo.schemas[transition].types;
      console.log({
        domain,
        types,
        inputs,
      });
      const signedMessage = await walletContext.signMessage(
        domain,
        types,
        inputs
      );
      const ethAddress = await walletContext.getEthAddress();
      console.log({ signedMessage, ethAddress });
      const res = await fetch(`http://localhost:3210/${transition}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transition,
          inputs,
          signature: signedMessage,
          msgSender: ethAddress,
        }),
      });
      console.log({ res });
      const data = await res.json();
      if (data.isOk)
        // return data;
        return data.logs;
      else return false;
    } catch (error) {
      console.error(error);
    }
  };

  const startLevel = async (level: number, width: number, height: number) => {
    try {
      const timestamp = Date.now();
      const res = await submitAction("startLevel", {
        timestamp,
        level,
        width,
        height,
      });

      if (res) {
        return {
          levelId: res[0].value,
        };
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  };

  const endLevel = async (levelId: string) => {
    try {
      const timestamp = Date.now();
      const gameInputs = JSON.stringify({
        timestamp,
        levelId,
      });
      const res = await submitAction("endLevel", {
        timestamp,
        levelId,
        gameInputs,
      });
      console.log({ res });

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("http://localhost:3210/leaderboard");
      console.log({ res });
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return { getInfo, submitAction, startLevel, endLevel, fetchLeaderboard };
};
