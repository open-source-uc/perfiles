/*
  Warnings:

  - The primary key for the `AchievementLevel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `level` on the `AchievementLevel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `AchievementLevel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `AchievementLevel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_levelName_fkey";

-- DropIndex
DROP INDEX "AchievementLevel_level_key";

-- AlterTable
ALTER TABLE "AchievementLevel" DROP CONSTRAINT "AchievementLevel_pkey",
DROP COLUMN "level",
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "AchievementLevel_pkey" PRIMARY KEY ("name");

-- CreateIndex
CREATE UNIQUE INDEX "AchievementLevel_name_key" ON "AchievementLevel"("name");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_levelName_fkey" FOREIGN KEY ("levelName") REFERENCES "AchievementLevel"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
