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
      const userInfo = await walletContext.getUserInfo();
      console.log({ userInfo });
      const ethAddress = userInfo?.ethAddress;

      const ethersProvider = new ethers.BrowserProvider(provider as IProvider);
      const signer = await ethersProvider.getSigner();

      const signedMessage = await signer.signTypedData(domain, types, inputs);

      console.log({ signedMessage });
      // const res = await fetch(`http://localhost:3210/${transition}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     transition,
      //     inputs,
      //     signature: signature,
      //     msgSender:  ethAddress,
      //   }),
      // });
      // console.log({ res });
      // const data = await res.json();

      // return data;
      return { isOk: true, levelId: 1 };
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
      console.log({ res });

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const endLevel = async (levelId: number) => {
    try {
      const timestamp = Date.now();
      const gameInputs = {
        timestamp,
        levelId,
      };
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
