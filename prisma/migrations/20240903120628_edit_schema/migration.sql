/*
  Warnings:

  - You are about to drop the column `positon` on the `employees` table. All the data in the column will be lost.
  - Added the required column `position` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "positon",
ADD COLUMN     "position" TEXT NOT NULL;
