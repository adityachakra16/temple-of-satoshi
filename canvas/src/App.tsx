import "./App.css";
import { Experience } from "./components/Experience";
import { GameProvider } from "./context/Game";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import {
  CHAIN_NAMESPACES,
  IProvider,
  WALLET_ADAPTERS,
  UX_MODE,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { WalletProvider } from "./context/Provider";
import { GlobalProvider } from "./context/Global";
import Timer from "./components/Timer";
import LogoutButton from "./components/Logout";

const clientId =
  "BBN9KFWfQcpmnwUVWZ_gKZNei_1KtuPB6x2gK9FBgm3XtspgKhncQYlk01X6WNv33mVZfHqy5c45sCG8abYUUJY"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

export const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

export const openloginAdapter = new OpenloginAdapter();
web3auth.configureAdapter(openloginAdapter);

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <WalletProvider>
          <GameProvider>
            <Experience />
            <Timer />
            <LogoutButton onLogout={() => {}} />
          </GameProvider>
        </WalletProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
