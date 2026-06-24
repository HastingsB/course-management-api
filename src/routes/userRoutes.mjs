import express from "express";
import { getProfile, adminDashboard } from "../controllers/userController.mjs";
import { protect, authorize } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/profile", protect, getProfile);

router.get(
    "/admin",
    protect,
    authorize("admin"),
    adminDashboard
);

export default router;