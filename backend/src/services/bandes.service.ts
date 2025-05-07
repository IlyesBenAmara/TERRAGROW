import { Bande, Parcelle } from "@prisma/client";

type TParcelle = Omit<Parcelle, "createdAt" | "updatedAt">;
type TBande = Omit<Bande, "id" | "createdAt" | "updatedAt">;

export const createBandes = (
  parcelle: TParcelle,
  largeur: number,
  largeurBande: number
): TBande[] => {
  const bandesNumber = largeur / largeurBande;
  const bandes = Array(Math.floor(bandesNumber))
    .fill("")
    .map((_item, idx) => ({
      number: idx + 1,
      parcelleId: parcelle.id,
      longueur: parcelle.longueur,
      largeur: largeurBande,
    }));

  const lastBandeLargeur = bandesNumber - Math.floor(bandesNumber);

  if (lastBandeLargeur === 0) {
    return bandes;
  }

  return [
    ...bandes,
    {
      number: bandes.length + 1,
      parcelleId: parcelle.id,
      longueur: parcelle.longueur,
      largeur: lastBandeLargeur,
    },
  ];
};
