/*
  Warnings:

  - The primary key for the `OrganizationAdminChange` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `transactionHash` on the `OrganizationAdminChange` table. All the data in the column will be lost.
  - You are about to drop the column `transactionIndex` on the `OrganizationAdminChange` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Nft` ADD COLUMN `totalSupply` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `OrganizationAdminChange` DROP PRIMARY KEY,
    DROP COLUMN `transactionHash`,
    DROP COLUMN `transactionIndex`,
    ADD PRIMARY KEY (`blockNumber`, `logIndex`);

-- CreateTable
CREATE TABLE `NFTTranfer` (
    `tokenId` INTEGER NOT NULL,
    `blockNumber` INTEGER NOT NULL,
    `logIndex` INTEGER NOT NULL,
    `from` VARCHAR(191) NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `type` ENUM('Single', 'Batch') NOT NULL,

    PRIMARY KEY (`tokenId`, `blockNumber`, `logIndex`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
