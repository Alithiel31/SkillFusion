import express from 'express';
import coursController from '../controllers/cours.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router= express.Router();

router.get("/cours",verifyToken,coursController.getAll)
router.get("/cours/homepage",coursController.getForHomePage)
router.get("/cours/instructor/:id",coursController.getCoursByInstructor)
router.get("/cours/:id",coursController.getOneCours)
router.post("/cours",coursController.createCours)
router.post("/cours/:id/visibility",coursController.changeVisibility)
router.patch("/cours/:id",coursController.updatingCours)
router.delete("/cours/:id",coursController.deleteCours)

export default router;