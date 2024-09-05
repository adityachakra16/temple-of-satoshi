import { IProvider } from "@web3auth/base";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { web3auth } from "../App";

interface WalletContextType {
  provider: IProvider | null;
  setProvider: (provider: IProvider | null) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  getUserInfo: () => Promise<any>;
  logout: () => Promise<void>;
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

  return (
    <WalletContext.Provider
      value={{
        provider,
        setProvider,
        loggedIn,
        setLoggedIn,
        getUserInfo,
        logout,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
