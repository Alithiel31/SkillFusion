import express from 'express';
import coursController from '../controllers/cours.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, roles } from '../middlewares/rbac.middleware';

export const router=express.Router()

router.get("/cours",coursController.getAll)
router.get("/cours/homepage",coursController.getForHomePage)
router.get("/cours/instructor/:id",coursController.getCoursByInstructor)
router.get("/cours/:id",coursController.getOneCours)

router.post("/cours", verifyToken, checkRoles([roles.instructor, roles.admin]), coursController.createCours)
router.post("/cours/:id/visibility", verifyToken, checkRoles([roles.instructor, roles.admin]),coursController.changeVisibility)
router.patch("/cours/:id", verifyToken, checkRoles([roles.instructor, roles.admin]), coursController.updatingCours)
router.delete("/cours/:id", verifyToken, checkRoles([roles.instructor, roles.admin]), coursController.deleteCours)

export default router;