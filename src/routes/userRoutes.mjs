import express from "express";
import protect from "../middleware/authMiddleware.mjs";
import { getProfile } from "../controllers/userController.mjs";

const router = express.Router();

router.get("/profile", protect, getProfile);

export default router;