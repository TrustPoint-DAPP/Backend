import { ethers } from "ethers";
import { getDealContractDomain, SIGNER_PRIVATE_KEY } from "./config";

const signer = new ethers.Wallet(SIGNER_PRIVATE_KEY);

export async function signForDealCreation(data: {
  orgId: string;
  orgAdmin: string;
  amount: string;
  royaltyBasisPoints: string;
  orgRoyaltyBasisPoints: string;
  counterParty: string;
  orgRoyaltyReceiver: string;
  nftCID: string;
  nonce: string;
}) {
  const types = {
    CreateDeal: [
      { name: "orgId", type: "uint256" },
      { name: "orgAdmin", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "royaltyBasisPoints", type: "uint96" },
      { name: "orgRoyaltyBasisPoints", type: "uint96" },
      { name: "counterParty", type: "address" },
      { name: "orgRoyaltyReceiver", type: "address" },
      { name: "nftCID", type: "string" },
      { name: "nonce", type: "uint256" },
    ],
  };

  return await signer._signTypedData(
    await getDealContractDomain(),
    types,
    data
  );
}
