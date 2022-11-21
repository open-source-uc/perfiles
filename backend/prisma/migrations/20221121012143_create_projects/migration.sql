-- CreateEnum
CREATE TYPE "ProjectAccess" AS ENUM ('OPEN', 'APPROVAL', 'CLOSED');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "creatorUsername" TEXT NOT NULL,
    "github" TEXT,
    "access" "ProjectAccess" NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsOnMembers" (
    "id" TEXT NOT NULL,
    "memberUsername" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectsOnMembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectsOnMembers_id_key" ON "ProjectsOnMembers"("id");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorUsername_fkey" FOREIGN KEY ("creatorUsername") REFERENCES "Member"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsOnMembers" ADD CONSTRAINT "ProjectsOnMembers_memberUsername_fkey" FOREIGN KEY ("memberUsername") REFERENCES "Member"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsOnMembers" ADD CONSTRAINT "ProjectsOnMembers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
