-- CreateTable
CREATE TABLE "Backup" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blob" JSONB NOT NULL,

    CONSTRAINT "Backup_pkey" PRIMARY KEY ("id")
);
