import express from "express";

import {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from "../controllers/courseController.mjs";

import {
    protect,
    authorize
} from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Routes for course management
router.post(
    "/",
    protect,
    authorize("teacher", "admin"),
    createCourse
);

// Update routes
router.put(
    "/:id",
    protect,
    authorize("teacher", "admin"),
    updateCourse
);

// Delete routes
router.delete(
    "/:id",
    protect,
    authorize("teacher", "admin"),
    deleteCourse
);

// Get routes
router.get("/", getCourses);

router.get("/:id", getCourseById);

export default router;