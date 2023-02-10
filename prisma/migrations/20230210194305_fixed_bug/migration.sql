/*
  Warnings:

  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Organization` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `orgId` on the `OrganizationAdminChange` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `OrganizationAdminChange` DROP FOREIGN KEY `OrganizationAdminChange_orgId_fkey`;

-- AlterTable
ALTER TABLE `Organization` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `description` LONGTEXT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `OrganizationAdminChange` MODIFY `orgId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `OrganizationAdminChange` ADD CONSTRAINT `OrganizationAdminChange_orgId_fkey` FOREIGN KEY (`orgId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
