import express from 'express';
import coursController from '../controllers/cours.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get("/cours", coursController.getAll)
router.get("/cours/homepage", coursController.getForHomePage)
router.get("/cours/:id", coursController.getOneCours)
router.post("/cours", coursController.createCours)
router.patch("/cours/:id", coursController.updatingCours)
router.delete("/cours/:id", coursController.deleteCours)

//Routes RGPD : suppression de compte
router.patch("/cours/mine/transfer", verifyToken, coursController.transferMyCoursToAdmin)
router.delete("/cours/mine", verifyToken, coursController.deleteAllMyCours)

export default router;