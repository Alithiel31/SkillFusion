import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import { registerUser, loginUser, logoutUser, refreshAccessToken, getAuthenticatedUser } from '../controlleurs/auth.controller';

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", verifyToken, logoutUser)
router.post("/refresh", refreshAccessToken)
router.get("/me", verifyToken, getAuthenticatedUser)

export default router;