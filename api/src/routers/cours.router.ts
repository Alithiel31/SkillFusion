import express from 'express';
import coursController from '../controllers/cours.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get("/cours", coursController.getAll)
router.get("/cours/homepage", coursController.getForHomePage)
router.get("/cours/:id", coursController.getOneCours)
router.post("/cours", coursController.createCours)
//Routes RGPD : transfert de propriété d'un/des cours en cas de suppression de compte
router.patch("/cours/mine/transfer", verifyToken, coursController.transferMyCoursToAdmin) // AVANT /:id
router.patch("/cours/:id", coursController.updatingCours)
//Routes RGPD : suppression des cours en cas de suppression de compte
router.delete("/cours/mine", verifyToken, coursController.deleteAllMyCours) // AVANT /:id
router.delete("/cours/:id", coursController.deleteCours)


export default router;