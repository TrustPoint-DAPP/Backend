-- CreateTable
CREATE TABLE `BlockchainSync` (
    `blockNumber` INTEGER NOT NULL,
    `transactionHash` VARCHAR(191) NOT NULL,
    `transactionIndex` INTEGER NOT NULL,
    `logIndex` INTEGER NOT NULL,
    `type` ENUM('DealCreated', 'DealCompleted', 'DealCancelled', 'NFTSingleTransfer', 'NFTBatchTransfer', 'OrganizationCreated', 'OrganizationLocked', 'OrganizationAdminChanged') NOT NULL,

    PRIMARY KEY (`blockNumber`, `transactionHash`, `transactionIndex`, `logIndex`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
