/*
  Warnings:

  - The values [ORGANIZATION] on the enum `Message_sender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Message` MODIFY `sender` ENUM('ORG', 'CELEB') NOT NULL;
