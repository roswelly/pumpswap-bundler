import { Keypair, PublicKey } from "@solana/web3.js";
import { getBuyTx } from "./getBuyTx";
import { getSellTx } from "./getSellTx";

// Example usage of PumpFun buy and sell functions
async function examplePumpFunTrading() {
  try {
    // Create a wallet keypair (in production, load from secure storage)
    const wallet = Keypair.generate();
    
    // Example token mint address (replace with actual token you want to trade)
    const baseMint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // USDC as example
    
    console.log("Wallet Public Key:", wallet.publicKey.toString());
    console.log("Token Mint:", baseMint.toString());
    
    // Example: Buy 0.1 SOL worth of tokens
    const buyAmountSOL = 0.1;
    console.log(`\nAttempting to buy ${buyAmountSOL} SOL worth of tokens...`);
    
    const buySignature = await getBuyTx(wallet, baseMint, buyAmountSOL);
    
    if (buySignature) {
      console.log("✅ Buy transaction successful!");
      console.log("Transaction signature:", buySignature);
      console.log("View on Solana Explorer:", `https://explorer.solana.com/tx/${buySignature}`);
    } else {
      console.log("❌ Buy transaction failed");
    }
    
    // Example: Sell 1000 tokens (replace with actual amount you want to sell)
    const sellAmountTokens = BigInt(1000);
    console.log(`\nAttempting to sell ${sellAmountTokens} tokens...`);
    
    const sellSignature = await getSellTx(wallet, baseMint, sellAmountTokens);
    
    if (sellSignature) {
      console.log("✅ Sell transaction successful!");
      console.log("Transaction signature:", sellSignature);
      console.log("View on Solana Explorer:", `https://explorer.solana.com/tx/${sellSignature}`);
    } else {
      console.log("❌ Sell transaction failed");
    }
    
  } catch (error) {
    console.error("Error executing PumpFun trading:", error);
  }
}

// Function to execute a single buy transaction
export async function executeBuy(
  wallet: Keypair,
  tokenMint: string,
  solAmount: number
): Promise<string | null> {
  try {
    const baseMint = new PublicKey(tokenMint);
    const signature = await getBuyTx(wallet, baseMint, solAmount);
    return signature;
  } catch (error) {
    console.error("Buy execution failed:", error);
    return null;
  }
}

// Function to execute a single sell transaction
export async function executeSell(
  wallet: Keypair,
  tokenMint: string,
  tokenAmount: bigint
): Promise<string | null> {
  try {
    const baseMint = new PublicKey(tokenMint);
    const signature = await getSellTx(wallet, baseMint, tokenAmount);
    return signature;
  } catch (error) {
    console.error("Sell execution failed:", error);
    return null;
  }
}

// Run example if this file is executed directly
if (require.main === module) {
  examplePumpFunTrading();
}
