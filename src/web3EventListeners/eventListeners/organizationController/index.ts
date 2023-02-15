import { BlockchainSyncTypes } from "@prisma/client";
import { syncEventsTillNow } from "../../../helpers";
import { OrganizationController } from "../../../typechain-types";
import adminChangeHandler from "./adminChangeHandler";
import createOrganizationHandler from "./createOrganizationHandler";
import lockOrganizationHandler from "./lockOrganizationHandler";

export default async function organizationControllerEventListeners(
  organizationController: OrganizationController
) {
  const CreateOrganizationFilter =
    organizationController.filters.CreateOrganization();
  const AdminUpdatedFilter = organizationController.filters.AdminUpdated();
  const OrganizationLockedFilter =
    organizationController.filters.OrganizationLocked();

  syncEventsTillNow(
    organizationController,
    BlockchainSyncTypes.OrganizationCreated,
    CreateOrganizationFilter,
    createOrganizationHandler
  );
  organizationController.on(
    CreateOrganizationFilter,
    (_orgId, _adminAddress, eventEmitted) => {
      createOrganizationHandler(eventEmitted);
    }
  );

  syncEventsTillNow(
    organizationController,
    BlockchainSyncTypes.OrganizationAdminChanged,
    AdminUpdatedFilter,
    adminChangeHandler
  );
  organizationController.on(
    AdminUpdatedFilter,
    (_orgId, _oldAdmin, _newAdmin, eventEmitted) => {
      adminChangeHandler(eventEmitted);
    }
  );

  syncEventsTillNow(
    organizationController,
    BlockchainSyncTypes.OrganizationLocked,
    OrganizationLockedFilter,
    lockOrganizationHandler
  );
  organizationController.on(
    OrganizationLockedFilter,
    (_orgId, eventEmitted) => {
      lockOrganizationHandler(eventEmitted);
    }
  );
}
