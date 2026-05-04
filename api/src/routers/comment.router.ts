import express from "express";
import commentController from "../controllers/comment.controller";
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, requireSelfOrAdmin, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

router.get("/comments", commentController.getAll)
router.get("/comments/:id", commentController.getOneComment)

router.post("/comments", verifyToken, checkRoles([ROLES.STUDENT, ROLES.INSTRUCTOR, ROLES.ADMIN]), commentController.createComment)

router.patch("/comments/:id", verifyToken, requireSelfOrAdmin, commentController.updatingComment)

router.delete("/comments/:id", verifyToken, requireSelfOrAdmin, commentController.deleteComment)

export default router;