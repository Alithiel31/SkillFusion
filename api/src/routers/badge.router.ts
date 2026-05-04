import express from 'express';
import badgeController from '../controllers/badge.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, roles } from '../middlewares/rbac.middleware';


const router = express.Router();

// Route Public
router.get("/badges", badgeController.getAll)
router.get("/badges/:id", badgeController.getOneBadge)

// Route dédié à l'admin (selon les User Stories)
router.post("/badges", verifyToken, checkRoles([roles.admin]), badgeController.createBadge)
router.patch("/badges/:id", verifyToken, checkRoles([roles.admin]), badgeController.updatingBadge)
router.delete("/badges/:id", verifyToken, checkRoles([roles.admin]), badgeController.deleteBadge)

export default router;