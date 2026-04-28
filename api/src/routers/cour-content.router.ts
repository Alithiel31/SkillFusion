import express from "express";
import courContent from "../controlleurs/cour-content.controller";

const router = express.Router();

router.get("/cours-contents", courContent.getAll)
router.get("/cours-contents/:id", courContent.getOneCourContent)

router.post("/cours-contents", courContent.createCourContent)

router.patch("/cours-contents/:id", courContent.updatingCourContent)

router.delete("/cours-contents/:id", courContent.deleteCourContent)

export default router;