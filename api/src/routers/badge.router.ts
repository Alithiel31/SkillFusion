import express from 'express';
import badgeController from '../controllers/badge.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, requireSelfOrAdmin, ROLES } from '../middlewares/rbac.middleware';


const router = express.Router();

router.get("/badges", badgeController.getAll)
router.get("/badges/:id", badgeController.getOneBadge)

router.post("/badges", verifyToken, checkRoles([ROLES.STUDENT, ROLES.TEACHER, ROLES.ADMIN]), badgeController.createBadge)

router.patch("/badges/:id", verifyToken, requireSelfOrAdmin, badgeController.updatingBadge)

router.delete("/badges/:id", verifyToken, requireSelfOrAdmin, badgeController.deleteBadge)

export default router;