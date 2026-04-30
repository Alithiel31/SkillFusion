import express from 'express';
import coursController from '../controllers/cours.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, requireSelfOrAdmin, ROLES } from '../middlewares/rbac.middleware';

const router= express.Router();

router.get("/cours",verifyToken,coursController.getAll)
router.get("/cours/homepage",coursController.getForHomePage)
router.get("/cours/instructor/:id",coursController.getCoursByInstructor)
router.get("/cours/:id",coursController.getOneCours)

router.post("/cours", verifyToken, checkRoles([ROLES.TEACHER, ROLES.ADMIN]), coursController.createCours)
router.post("/cours/:id/visibility",checkRoles([ROLES.TEACHER, ROLES.ADMIN]),coursController.changeVisibility)
router.patch("/cours/:id", verifyToken, requireSelfOrAdmin, coursController.updatingCours)
router.delete("/cours/:id", verifyToken, requireSelfOrAdmin, coursController.deleteCours)

export default router;