import { BlockchainSyncTypes, PrismaClient } from "@prisma/client";
import { checkAndCreateSync } from "../../../helpers";
import { DealCancelledEvent } from "../../../typechain-types/contracts/Deal.sol/DealController";

const prisma = new PrismaClient();

export default async function dealCancelledHandler(
  eventEmitted: DealCancelledEvent
) {
  const {
    blockNumber,
    transactionHash,
    transactionIndex,
    logIndex,
    event,
    args,
  } = eventEmitted;
  const { dealId } = args;

  const dealObj = await prisma.deal.findUnique({
    where: { id: Number(dealId) },
  });
  if (!dealObj) return;

  if (
    !(await checkAndCreateSync(
      blockNumber,
      transactionHash,
      transactionIndex,
      logIndex,
      BlockchainSyncTypes.DealCancelled
    ))
  )
    return;
  console.log(event);

  await prisma.deal.update({
    where: {
      id: Number(dealId),
    },
    data: {
      cancelled: true,
    },
  });
}
