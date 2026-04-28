import express from 'express';
import toolController from '../controllers/tool.controller';

const router = express.Router();

router.get("/tools", toolController.getAll);
router.get("/tools/:id", toolController.getOneTool);

router.post("/tools", toolController.createTool);

router.patch("/tools/:id", toolController.updatingTool);

router.delete("/tools/:id", toolController.deleteTool);

export default router;