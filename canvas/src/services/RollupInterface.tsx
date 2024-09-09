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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/info`);
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
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/${transition}`,
        {
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
        }
      );
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

  const startLevel = async (
    level: number,
    width: number,
    height: number,
    map: any
  ) => {
    try {
      const timestamp = Date.now();
      const res = await submitAction("startLevel", {
        timestamp,
        level,
        width,
        height,
        map: JSON.stringify(map),
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

  const endLevel = async (levelId: string, respawns: number) => {
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
        respawns,
      });
      console.log({ res });

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/leaderboard`);
      console.log({ res });
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const generateMap = async (level: number) => {
    try {
      console.log(process.env.REACT_APP_API_URL);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/map/${level}`);
      const data = await res.json();
      console.log({ data });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getInfo,
    submitAction,
    startLevel,
    endLevel,
    fetchLeaderboard,
    generateMap,
  };
};
