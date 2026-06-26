import express from "express";

import {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse
} from "../controllers/courseController.mjs";

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

router.put(
    "/:id",
    protect,
    authorize("teacher", "admin"),
    updateCourse
);

router.get("/", getCourses);

router.get("/:id", getCourseById);

export default router;