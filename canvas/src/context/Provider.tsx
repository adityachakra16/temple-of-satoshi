import { IProvider } from "@web3auth/base";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { web3auth } from "../App";
import { ethers } from "ethers";

interface WalletContextType {
  provider: IProvider | null;
  setProvider: (provider: IProvider | null) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  getUserInfo: () => Promise<any>;
  logout: () => Promise<void>;
  signMessage: (
    domain: any,
    types: any,
    message: any
  ) => Promise<string | null>;
  getEthAddress: () => Promise<string | null>;
}

export const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: any) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    return user;
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    console.log("Logged out");
  };

  const signMessage = async (domain: any, types: any, message: any) => {
    if (!provider) return null;

    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    const signedMessage = await signer.signTypedData(domain, types, message);
    return signedMessage;
  };

  const getEthAddress = async () => {
    if (!provider) return null;

    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();
    const ethAddress = await signer.getAddress();
    return ethAddress;
  };

  return (
    <WalletContext.Provider
      value={{
        provider,
        setProvider,
        loggedIn,
        setLoggedIn,
        getUserInfo,
        logout,
        signMessage,
        getEthAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
