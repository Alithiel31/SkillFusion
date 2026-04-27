import express from 'express';
import learningObjectifController from '../controlleurs/learning-objectif.controller';

const router = express.Router();

router.get("/learning-objectifs", learningObjectifController.getAll)
router.get("/learning-objectifs/:id", learningObjectifController.getOneLearningObjectif)

router.post("/learning-objectifs", learningObjectifController.createLearningObjectif)

router.patch("/learning-objectifs/:id", learningObjectifController.updatingLearningObjectif)

router.delete("/learning-objectifs/:id", learningObjectifController.deleteLearningObjectif)

export default router;