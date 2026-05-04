import express from 'express';
import learningObjectifController from '../controllers/learning-objectif.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, roles } from '../middlewares/rbac.middleware';

const router = express.Router();

// Routes publiques
router.get("/learning-objectifs", learningObjectifController.getAll)
router.get("/learning-objectifs/:id", learningObjectifController.getOneLearningObjectif)

// Routes dédiées aux enseignants et à l'admin
router.post("/learning-objectifs", verifyToken, checkRoles([roles.instructor, roles.admin]), learningObjectifController.createLearningObjectif)
router.patch("/learning-objectifs/:id", verifyToken, checkRoles([roles.instructor, roles.admin]), learningObjectifController.updatingLearningObjectif)
router.delete("/learning-objectifs/:id", verifyToken, checkRoles([roles.instructor, roles.admin]), learningObjectifController.deleteLearningObjectif)

export default router;