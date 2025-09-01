import express from "express";

import { signup, login, updateProfile, checkAuth } from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/update-profile", protectRoute, updateProfile);
router.post("/check-auth", protectRoute, checkAuth);

export default router;
