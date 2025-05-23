/*
  Warnings:

  - You are about to drop the column `content` on the `review` table. All the data in the column will be lost.
  - You are about to drop the `loan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `loan` DROP FOREIGN KEY `Loan_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `loan` DROP FOREIGN KEY `Loan_userId_fkey`;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `content`,
    ADD COLUMN `comment` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `loan`;
