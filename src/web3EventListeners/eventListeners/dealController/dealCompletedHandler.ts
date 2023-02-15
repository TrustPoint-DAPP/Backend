import { BlockchainSyncTypes, PrismaClient } from "@prisma/client";
import { DealCompletedEvent } from "../../../typechain-types/contracts/Deal.sol/DealController";

const prisma = new PrismaClient();

export default async function dealCompletedHandler(
  eventEmitted: DealCompletedEvent
) {
  const { blockNumber, transactionHash, transactionIndex, logIndex, args } =
    eventEmitted;
  const { dealId, nftIds, tokenIds, royaltyReceivers } = args;

  const dealObj = await prisma.deal.findUnique({
    where: { id: Number(dealId) },
  });
  if (!dealObj || dealObj.done) return;

  const sync = await prisma.blockchainSync.findUnique({
    where: {
      blockNumber_transactionHash_transactionIndex_logIndex: {
        blockNumber,
        transactionHash,
        transactionIndex,
        logIndex,
      },
    },
  });
  if (sync) return;

  await prisma.blockchainSync.create({
    data: {
      type: BlockchainSyncTypes.DealCompleted,
      blockNumber,
      transactionHash,
      transactionIndex,
      logIndex,
    },
  });

  for (let i = 0; i < nftIds.length; i++) {
    const nftId = Number(nftIds[i]);
    const tokenId = Number(tokenIds[i]);
    const royaltySplitter = royaltyReceivers[i];

    await prisma.nft.update({
      where: { id: nftId },
      data: {
        tokenId,
        royaltySplitter,
        created: true,
      },
    });
  }

  await prisma.deal.update({
    where: {
      id: Number(dealId),
    },
    data: {
      done: true,
    },
  });
}
