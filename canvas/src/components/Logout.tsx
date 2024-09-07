import { useContext } from "react";
import { WalletContext } from "../context/Provider";

const LogoutButton = ({ onLogout }: any) => {
  const walletContext = useContext(WalletContext);

  if (!walletContext) return <></>;

  if (walletContext.loggedIn === false) return <></>;

  return (
    <button
      onClick={() => {
        if (!walletContext) return;
        walletContext.logout();
        onLogout && onLogout();
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
      Logout
    </button>
  );
};

export default LogoutButton;
