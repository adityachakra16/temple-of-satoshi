import { ethers } from "ethers";
import contractABI from "./MapGenerationLLM_ABI.json"; // Replace with the actual path to your ABI
import { LLMInstructions } from "./constants";

// Contract address (replace with your deployed contract address)
const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Define the generateMap function
export async function generateMap() {
  try {
    // Create contract instance
    const mapGenerationContract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      contractABI,
      wallet
    );

    // Call the sendMessage function with the message you want to send
    const tx = await mapGenerationContract.sendMessage(LLMInstructions);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    console.log("Message sent successfully!");

    return receipt.transactionHash;
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
