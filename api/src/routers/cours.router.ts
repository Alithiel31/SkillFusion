import express, { NextFunction } from 'express';
import coursController from '../controllers/cours.controller';

const router= express.Router();

router.get("/cours",coursController.getAll)
router.get("/cours/homepage",coursController.getForHomePage)
router.get("/cours/instructor/:id",coursController.getCoursByInstructor)
router.get("/cours/:id",coursController.getOneCours)
router.post("/cours",coursController.createCours)
router.patch("/cours/:id",coursController.updatingCours)
router.delete("/cours/:id",coursController.deleteCours)

export default router;