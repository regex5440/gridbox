-- CreateTable
CREATE TABLE "passkeys" (
    "id" TEXT NOT NULL,
    "pkey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "credId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "passkeys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passkeys_credId_key" ON "passkeys"("credId");

-- AddForeignKey
ALTER TABLE "passkeys" ADD CONSTRAINT "passkeys_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
