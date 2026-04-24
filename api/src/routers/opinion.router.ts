import express from 'express';
import opinionController from '../controlleurs/opinion.controller';

const router = express.Router();

router.get("/opinions", opinionController.getAll)
router.get("/opinions/:id", opinionController.getOneOpinion)

router.post("/opinions", opinionController.createOpinion)

router.patch("/opinions/:id", opinionController.updateOpinion)

router.delete("/opinions/:id", opinionController.deleteOpinion)

export default router;  