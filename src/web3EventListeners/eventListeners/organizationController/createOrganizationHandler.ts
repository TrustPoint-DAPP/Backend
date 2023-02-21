import { BlockchainSyncTypes, PrismaClient } from "@prisma/client";
import { checkAndCreateSync } from "../../../helpers";
import { CreateOrganizationEvent } from "../../../typechain-types/contracts/Organization.sol/OrganizationController";

const prisma = new PrismaClient();

export default async function createOrganizationHandler(
  eventEmitted: CreateOrganizationEvent
) {
  const {
    blockNumber,
    transactionHash,
    transactionIndex,
    logIndex,
    event,
    args,
  } = eventEmitted;
  const { orgId, adminAddress, nftContract } = args;

  if (
    !(await checkAndCreateSync(
      blockNumber,
      transactionHash,
      transactionIndex,
      logIndex,
      BlockchainSyncTypes.OrganizationCreated
    ))
  )
    return;
  console.log(event);

  await prisma.organization.update({
    where: { id: Number(orgId) },
    data: { nftContract },
  });
}
