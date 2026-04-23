import express from 'express';
import coursController from '../controlleurs/cours.controller';

const router= express.Router();

router.get("/cours",coursController.getAll)
router.get("/cours/:id",coursController.getOneCours)
router.get("/cours/homepage",coursController.getForHomePage)
router.post("/cours",coursController.createCours)
router.patch("/cours/:id",coursController.updatingCours)
router.delete("/cours/:id",coursController.deleteCours)

export default router;