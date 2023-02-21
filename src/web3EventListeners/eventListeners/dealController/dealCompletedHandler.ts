import { BlockchainSyncTypes, PrismaClient } from "@prisma/client";
import { checkAndCreateSync } from "../../../helpers";
import { DealCompletedEvent } from "../../../typechain-types/contracts/Deal.sol/DealController";

const prisma = new PrismaClient();

export default async function dealCompletedHandler(
  eventEmitted: DealCompletedEvent
) {
  const {
    blockNumber,
    transactionHash,
    transactionIndex,
    logIndex,
    event,
    args,
  } = eventEmitted;
  const { dealId, nftIds, tokenIds, royaltyReceivers } = args;

  const dealObj = await prisma.deal.findUnique({
    where: { id: Number(dealId) },
  });
  if (!dealObj || dealObj.done) return;

  if (
    !(await checkAndCreateSync(
      blockNumber,
      transactionHash,
      transactionIndex,
      logIndex,
      BlockchainSyncTypes.DealCompleted
    ))
  )
    return;
  console.log(event);

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
