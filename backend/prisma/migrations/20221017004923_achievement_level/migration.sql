/*
  Warnings:

  - You are about to drop the column `level` on the `Achievement` table. All the data in the column will be lost.
  - Added the required column `levelName` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "level",
ADD COLUMN     "levelName" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AchievementLevel";

-- CreateTable
CREATE TABLE "AchievementLevel" (
    "level" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "AchievementLevel_pkey" PRIMARY KEY ("level")
);

-- CreateIndex
CREATE UNIQUE INDEX "AchievementLevel_level_key" ON "AchievementLevel"("level");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_levelName_fkey" FOREIGN KEY ("levelName") REFERENCES "AchievementLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;
