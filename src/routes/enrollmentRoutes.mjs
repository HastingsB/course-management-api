import express from "express";
import {
    enrollCourse,
    getMyEnrollments
} from "../controllers/enrollmentController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/:courseId", protect, enrollCourse);

router.get("/my-courses", protect, getMyEnrollments);

export default router;