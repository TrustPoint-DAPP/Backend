-- CreateTable
CREATE TABLE `Organization` (
    `id` VARCHAR(191) NOT NULL,
    `admin` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imageCID` VARCHAR(191) NOT NULL,
    `nonce` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `locked` BOOLEAN NOT NULL DEFAULT false,
    `lockedBlockNumber` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganizationAdminChange` (
    `transactionHash` VARCHAR(191) NOT NULL,
    `blockNumber` INTEGER NOT NULL,
    `transactionIndex` INTEGER NOT NULL,
    `logIndex` INTEGER NOT NULL,
    `oldAdmin` VARCHAR(191) NOT NULL,
    `newAdmin` VARCHAR(191) NOT NULL,
    `orgId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`transactionHash`, `blockNumber`, `transactionIndex`, `logIndex`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrganizationAdminChange` ADD CONSTRAINT `OrganizationAdminChange_orgId_fkey` FOREIGN KEY (`orgId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
