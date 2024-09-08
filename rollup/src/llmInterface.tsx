import { ethers } from "ethers";
import contractABI from "./MapGenerationLLM_ABI.json"; // Replace with the actual path to your ABI

// Contract address (replace with your deployed contract address)
const contractAddress = "0xYourDeployedContractAddress";

// Define the generateMap function
export async function generateMap(message) {
  try {
    // Connect to Ethereum provider (MetaMask, for example)
    const provider = new ethers.providers.JsonRpcProvider(providerURL);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create contract instance
    const mapGenerationContract = new ethers.Contract(
      contractAddress,
      contractABI,
      wallet
    );

    // Connect to the contract
    const mapGenerationContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    // Call the sendMessage function with the message you want to send
    const tx = await mapGenerationContract.sendMessage(message);

    // Wait for the transaction to be mined
    await tx.wait();

    console.log("Message sent successfully!");

    return tx.hash;
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
