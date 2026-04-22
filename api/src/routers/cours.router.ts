import express from 'express';
import coursController from '../controlleurs/cours.controller';

const router= express.Router();

router.get("/cours",coursController.getAll)




export default router;