import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

export const PORT = Number(process.env.PORT || "8000");
export const ORGANIZATION_CONTRACT_ADDRESS =
  process.env.ORGANIZATION_CONTRACT_ADDRESS || "";
export const DEAL_CONTRACT_ADDRESS = process.env.DEAL_CONTRACT_ADDRESS || "";
export const LOGGER_CONTRACT_ADDRESS =
  process.env.LOGGER_CONTRACT_ADDRESS || "";
export const WEB3_RPC_URI = process.env.WEB3_RPC_URI || "";
export const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY || "";
export const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY || "";
export const CHAIN_ID = process.env.CHAIN_ID || 3141;
export const NONCE_TEMPLATE = process.env.NONCE_MESSAGE || "The Nonce is: %";
export const CHANNEL_PK = process.env.CHANNEL_PK || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const MIN_BLOCK = Number(process.env.MIN_BLOCK || "0");

export const provider = new ethers.providers.WebSocketProvider(WEB3_RPC_URI);
