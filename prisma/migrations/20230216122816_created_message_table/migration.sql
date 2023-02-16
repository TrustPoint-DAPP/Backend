/*
  Warnings:

  - A unique constraint covering the columns `[proposalId]` on the table `Deal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `proposalId` to the `Deal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Deal` ADD COLUMN `proposalId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orgId` INTEGER NOT NULL,
    `celebId` INTEGER NOT NULL,
    `unread` BOOLEAN NOT NULL,
    `type` ENUM('IMAGE', 'VIDEO', 'DEAL', 'TEXT') NOT NULL,
    `sender` ENUM('ORGANIZATION', 'CELEB') NOT NULL,
    `text` LONGTEXT NULL,
    `imageCID` VARCHAR(191) NULL,
    `videoCID` VARCHAR(191) NULL,
    `dealId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Message_dealId_key`(`dealId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Deal_proposalId_key` ON `Deal`(`proposalId`);

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_orgId_fkey` FOREIGN KEY (`orgId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_celebId_fkey` FOREIGN KEY (`celebId`) REFERENCES `Celeb`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_dealId_fkey` FOREIGN KEY (`dealId`) REFERENCES `Deal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
