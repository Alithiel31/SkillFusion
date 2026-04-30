import express from 'express';
import opinionController from '../controllers/opinion.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, requireSelfOrAdmin, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

router.get("/opinions", opinionController.getAll)
router.get("/opinions/:coursId/user/:id",opinionController.getByUser)
router.get("/opinions/:id", opinionController.getOneOpinion)

router.post("/opinions", verifyToken, checkRoles([ROLES.STUDENT, ROLES.TEACHER, ROLES.ADMIN]), opinionController.createOpinion)

router.patch("/opinions/:id", verifyToken, requireSelfOrAdmin, opinionController.updateOpinion)

router.delete("/opinions/:id", verifyToken, requireSelfOrAdmin, opinionController.deleteOpinion)

export default router;  