-- CreateTable
CREATE TABLE "AchievementProgressionNode" (
    "id" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "AchievementProgressionNode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AchievementProgressionNode_id_key" ON "AchievementProgressionNode"("id");

-- AddForeignKey
ALTER TABLE "AchievementProgressionNode" ADD CONSTRAINT "AchievementProgressionNode_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementProgressionNode" ADD CONSTRAINT "AchievementProgressionNode_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "AchievementProgressionNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
