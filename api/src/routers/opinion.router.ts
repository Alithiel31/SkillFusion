import express from 'express';
import opinionController from '../controllers/opinion.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, requireSelfOrAdmin, roles } from '../middlewares/rbac.middleware';

const router = express.Router();

router.get("/opinions", opinionController.getAll)
router.get("/opinions/:coursId/user/:id",opinionController.getByUser)
router.get("/opinions/:id", opinionController.getOneOpinion)

router.post("/opinions", verifyToken, checkRoles([roles.student, roles.instructor, roles.admin]), opinionController.createOpinion)

router.patch("/opinions/:id", verifyToken, checkRoles([roles.student, roles.admin]), opinionController.updateOpinion)

router.delete("/opinions/:id", verifyToken,checkRoles([roles.student, roles.admin]), opinionController.deleteOpinion)

export default router;  