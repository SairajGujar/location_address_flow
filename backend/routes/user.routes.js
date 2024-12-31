import { Router } from "express";
import { login, register, getProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = new Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile', authMiddleware, getProfile)

export default router;