/*
  Warnings:

  - You are about to drop the column `level` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "level",
DROP COLUMN "score";
