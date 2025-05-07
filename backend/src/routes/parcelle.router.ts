import {
  getParcelles,
  getBandesParcelle,
  createParcelle,
} from "controllers/parcelle.controller";
import { Router } from "express";

const router = Router();

router.get("/", getParcelles);
router.get("/:id/bandes", getBandesParcelle);
router.post("/", createParcelle);

export default router;
