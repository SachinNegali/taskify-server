import express from "express";
import { signup, login, resetPassword } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", authenticateToken, resetPassword);

export default router;
