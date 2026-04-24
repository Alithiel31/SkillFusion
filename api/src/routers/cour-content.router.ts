import express from "express";
import courContent from "../controlleurs/cour-content.controller";

const router = express.Router();

router.get("/cour-contents", courContent.getAll)
router.get("/cour-contents/:id", courContent.getOneCourContent)

router.post("/cour-contents", courContent.createCourContent)

router.patch("/cour-contents/:id", courContent.updatingCourContent)

router.delete("/cour-contents/:id", courContent.deleteCourContent)

export default router;