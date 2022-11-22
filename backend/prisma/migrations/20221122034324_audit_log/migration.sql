-- CreateTable
CREATE TABLE "AuditEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "service" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actorUsername" TEXT,
    "data" JSONB NOT NULL,

    CONSTRAINT "AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuditEntry_id_key" ON "AuditEntry"("id");

-- AddForeignKey
ALTER TABLE "AuditEntry" ADD CONSTRAINT "AuditEntry_actorUsername_fkey" FOREIGN KEY ("actorUsername") REFERENCES "Member"("username") ON DELETE SET NULL ON UPDATE CASCADE;
