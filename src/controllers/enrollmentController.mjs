import Course from "../models/courseModel.mjs";
import Enrollment from "../models/enrollmentModel.mjs";

export const enrollCourse = async (req, res) => {
    try {
        // Only students can enroll
        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can enroll in courses"
            });
        }

        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Check for existing enrollment
        const existingEnrollment = await Enrollment.findOne({
            student: req.user._id,
            course: req.params.courseId
        });

        if (existingEnrollment) {
            return res.status(400).json({
                message: "You are already enrolled in this course"
            });
        }

        const enrollment = await Enrollment.create({
            student: req.user._id,
            course: req.params.courseId
        });

        res.status(201).json({
            message: "Enrollment successful",
            enrollment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get all enrollments for the logged-in student
export const getMyEnrollments = async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can view enrollments"
            });
        }

        const enrollments = await Enrollment.find({
            student: req.user._id
        }).populate({
            path: "course",
            populate: {
                path: "teacher",
                select: "name email"
            }
        });

        res.status(200).json(enrollments);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};