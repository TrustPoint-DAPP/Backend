import { BlockchainSyncTypes, PrismaClient } from "@prisma/client";
import { checkAndCreateSync } from "../../../helpers";
import { OrganizationLockedEvent } from "../../../typechain-types/contracts/Organization.sol/OrganizationController";

const prisma = new PrismaClient();

export default async function lockOrganizationHandler(
  eventEmitted: OrganizationLockedEvent
) {
  const {
    blockNumber,
    transactionHash,
    transactionIndex,
    logIndex,
    event,
    args,
  } = eventEmitted;
  const { orgId } = args;

  if (
    !(await checkAndCreateSync(
      blockNumber,
      transactionHash,
      transactionIndex,
      logIndex,
      BlockchainSyncTypes.OrganizationLocked
    ))
  )
    return;
  console.log(event);

  const organization = await prisma.organization.findUnique({
    where: { id: Number(orgId) },
  });
  if (!organization || organization.locked) return;

  await prisma.organization.update({
    where: { id: Number(orgId) },
    data: { locked: true },
  });
}
