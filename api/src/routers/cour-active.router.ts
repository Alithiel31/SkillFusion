import express from "express";
import coursActiveController from "../controllers/cour-active.controller";

const router = express.Router();

router.get("/cours-active", coursActiveController.getAll)
router.get("/cours-active/:id", coursActiveController.getOneCoursActive)

router.post("/cours-active", coursActiveController.createCoursActive)

router.patch("/cours-active/:id", coursActiveController.updatingCoursActive)

router.delete("/cours-active/:id", coursActiveController.deleteCoursActive)

export default router;