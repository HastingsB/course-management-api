import express from "express";
import {
    getProfile,
    adminDashboard,
    approveTeacher
} from "../controllers/userController.mjs";
import { protect, authorize } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/profile", protect, getProfile);

router.get(
    "/admin",
    protect,
    authorize("admin"),
    adminDashboard
);

router.put(
    "/approve-teacher/:id",
    protect,
    authorize("admin"),
    approveTeacher
);

export default router;