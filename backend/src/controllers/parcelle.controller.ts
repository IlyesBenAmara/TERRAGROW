import { Request, Response } from "express";
import { createBandes } from "services/bandes.service";
import db from "utils/db";

const LARGEUR_BANDE_STANDARD = 1.2;

// GET /parcelles → liste des parcelles avec leur nombre de bandes
export const getParcelles = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parcelles = await db.parcelle.findMany({
      select: {
        id: true,
        nom: true,
        Bande: true,
      },
    });

    const response = parcelles.map(({ id, nom, Bande }) => ({
      id,
      nom,
      nombreBande: Bande.length,
    }));

    return res.status(200).json({ data: response });
  } catch (e) {
    console.error("An Error occured: ", e);
  }
};

// GET /parcelles/:id/bandes → liste des bandes d’une parcelle
export const getBandesParcelle = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = +req.params.id;
    const bandes = await db.bande.findMany({
      where: {
        parcelleId: id,
      },
      select: {
        id: true,
        number: true,
        longueur: true,
        largeur: true,
      },
    });

    return res.status(200).json({ data: bandes });
  } catch (e) {
    console.error("An Error occured: ", e);
  }
};

// POST /parcelles → crée une parcelle et génère les bandes associées
export const createParcelle = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parcellePayload = req.body;
    const { nom, longueur, largeur } = parcellePayload;

    const parcelle = await db.parcelle.create({
      data: { nom, longueur, largeur },
      select: {
        id: true,
        nom: true,
        longueur: true,
        largeur: true,
      },
    });

    const data = createBandes(parcelle, largeur, LARGEUR_BANDE_STANDARD);

    const bandes = await db.bande.createMany({ data });

    return res
      .status(200)
      .json({ data: { ...parcelle, nombreBande: data.length } });
  } catch (e) {
    console.error("An Error occured: ", e);
  }
};
