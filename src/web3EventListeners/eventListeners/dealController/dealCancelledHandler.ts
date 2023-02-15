import { BlockchainSyncTypes, PrismaClient } from "@prisma/client";
import { DealCancelledEvent } from "../../../typechain-types/contracts/Deal.sol/DealController";

const prisma = new PrismaClient();

export default async function dealCancelledHandler(
  eventEmitted: DealCancelledEvent
) {
  const { blockNumber, transactionHash, transactionIndex, logIndex, args } =
    eventEmitted;
  const { dealId } = args;

  const dealObj = await prisma.deal.findUnique({
    where: { id: Number(dealId) },
  });
  if (!dealObj) return;

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
      type: BlockchainSyncTypes.DealCancelled,
      blockNumber,
      transactionHash,
      transactionIndex,
      logIndex,
    },
  });

  await prisma.deal.update({
    where: {
      id: Number(dealId),
    },
    data: {
      cancelled: true,
    },
  });
}
