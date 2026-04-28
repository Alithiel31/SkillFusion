import express from "express";
import commentController from "../controllers/comment.controller";

const router = express.Router();

router.get("/comments", commentController.getAll)
router.get("/comments/:id", commentController.getOneComment)

router.post("/comments", commentController.createComment)

router.patch("/comments/:id", commentController.updatingComment)

router.delete("/comments/:id", commentController.deleteComment)

export default router;