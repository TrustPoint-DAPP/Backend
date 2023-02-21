import { BlockchainSyncTypes, PrismaClient } from "@prisma/client";
import { checkAndCreateSync } from "../../../helpers";
import { AdminUpdatedEvent } from "../../../typechain-types/contracts/Organization.sol/OrganizationController";

const prisma = new PrismaClient();

export default async function adminChangeHandler(
  eventEmitted: AdminUpdatedEvent
) {
  const {
    blockNumber,
    transactionHash,
    transactionIndex,
    logIndex,
    event,
    args,
  } = eventEmitted;
  const { orgId, oldAdmin, newAdmin } = args;

  if (
    !(await checkAndCreateSync(
      blockNumber,
      transactionHash,
      transactionIndex,
      logIndex,
      BlockchainSyncTypes.OrganizationAdminChanged
    ))
  )
    return;
  console.log(event);

  const organization = await prisma.organization.findUnique({
    where: { id: Number(orgId) },
  });
  if (!organization) return;

  const lastChange = await prisma.organizationAdminChange.findFirst({
    orderBy: [{ blockNumber: "desc" }, { logIndex: "desc" }],
  });
  if (
    !lastChange ||
    lastChange.blockNumber > blockNumber ||
    (lastChange.blockNumber == blockNumber && lastChange.logIndex > logIndex)
  )
    await prisma.organization.update({
      where: { id: Number(orgId) },
      data: { admin: newAdmin },
    });

  await prisma.organizationAdminChange.create({
    data: {
      blockNumber,
      logIndex,
      oldAdmin,
      newAdmin,
      org: {
        connect: { id: Number(orgId) },
      },
    },
  });
}
