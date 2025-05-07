-- CreateTable
CREATE TABLE "Parcelle" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "largeur" DOUBLE PRECISION NOT NULL,
    "longueur" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parcelle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bande" (
    "id" SERIAL NOT NULL,
    "parcelleId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "longueur" DOUBLE PRECISION NOT NULL,
    "largeur" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bande_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bande" ADD CONSTRAINT "Bande_parcelleId_fkey" FOREIGN KEY ("parcelleId") REFERENCES "Parcelle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
