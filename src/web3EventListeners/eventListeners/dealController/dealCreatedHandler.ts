import { BlockchainSyncTypes, PrismaClient } from "@prisma/client";
import { checkAndCreateSync } from "../../../helpers";
import { DealCreatedEvent } from "../../../typechain-types/contracts/Deal.sol/DealController";

const prisma = new PrismaClient();

export default async function dealCreatedHandler(
  eventEmitted: DealCreatedEvent
) {
  const { blockNumber, transactionHash, transactionIndex, logIndex, args } =
    eventEmitted;
  const { deal, nfts } = args;

  const dealObj = await prisma.deal.findUnique({
    where: { id: Number(deal.id) },
  });
  if (dealObj) return;

  if (
    !(await checkAndCreateSync(
      blockNumber,
      transactionHash,
      transactionIndex,
      logIndex,
      BlockchainSyncTypes.DealCreated
    ))
  )
    return;

  // TODO: check if organization and celeb exists in the database or not, if not then create them in the database

  await prisma.deal.create({
    data: {
      id: Number(deal.id),
      celeb: {
        connect: { address: deal.counterParty },
      },
      org: {
        connect: { id: Number(deal.orgId) },
      },
      oneOffFees: deal.oneOffPayment.toString(),
      orgRoyaltyReceier: deal.orgRoyaltyReceiver,
    },
  });

  for (const nft of nfts) {
    // TODO: check if the cid exists in the database and if not then fetch the metadata of the nft and store in the db

    await prisma.nft.create({
      data: {
        id: Number(nft.id),
        deal: {
          connect: { id: Number(deal.id) },
        },
        metadata: {
          connect: { cid: nft.nftCID },
        },
        royaltyBasisPoints: Number(nft.royaltyBasisPoints),
        orgRoyaltyBasisPoints: Number(nft.orgRoyaltyBasisPoints),
      },
    });
  }
}
