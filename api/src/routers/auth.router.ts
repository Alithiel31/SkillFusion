import express from 'express';
import authController from '../controlleurs/auth.controller';

const router= express.Router();

router.post("/register",authController.register)
router.post("/login",authController.login)
router.post("/logout",authController.logout)
router.post("/refresh",authController.refresh)
router.get("/me",authController.me)



export default router;