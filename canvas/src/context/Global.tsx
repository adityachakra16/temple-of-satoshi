import { createContext, useContext, useEffect, useRef, useState } from "react";
import { RollupInterface } from "../services/RollupInterface";

interface GlobalContextType {
  mruInfo: any;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: any) => {
  const [mruInfo, setMruInfo] = useState<any>(null);
  const { getInfo } = RollupInterface();

  useEffect(() => {
    void (async () => {
      try {
        const res = await getInfo();
        setMruInfo(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        mruInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
