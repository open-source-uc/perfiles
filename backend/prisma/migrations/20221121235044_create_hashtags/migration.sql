-- CreateTable
CREATE TABLE "Hashtag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Hashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HashtagsOnProjects" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "hashtagId" TEXT NOT NULL,

    CONSTRAINT "HashtagsOnProjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_id_key" ON "Hashtag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_name_key" ON "Hashtag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "HashtagsOnProjects_id_key" ON "HashtagsOnProjects"("id");

-- AddForeignKey
ALTER TABLE "HashtagsOnProjects" ADD CONSTRAINT "HashtagsOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HashtagsOnProjects" ADD CONSTRAINT "HashtagsOnProjects_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
