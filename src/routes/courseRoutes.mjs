import express from "express";
import { createCourse } from "../controllers/courseController.mjs";
import {
    protect,
    authorize
} from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize("teacher", "admin"),
    createCourse
);

export default router;