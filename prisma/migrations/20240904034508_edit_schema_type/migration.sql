/*
  Warnings:

  - Made the column `phone` on table `employees` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "phone" SET NOT NULL;
