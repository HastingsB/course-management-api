import Course from "../models/courseModel.mjs";

export const createCourse = async (req, res) => {
    try {

        // Teachers must be approved
        if (
            req.user.role === "teacher" &&
            !req.user.isApproved
        ) {
            return res.status(403).json({
                message: "Teacher account not approved"
            });
        }

        const { title, description } = req.body;

        const course = await Course.create({
            title,
            description,
            teacher: req.user._id
        });

        res.status(201).json({
            message: "Course created successfully",
            course
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get all courses with teacher details
export const getCourses = async (req, res) => {
    try {

        const courses = await Course.find()
            .populate("teacher", "name email role");

        res.status(200).json(courses);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get a specific course by ID with teacher detailsss
export const getCourseById = async (req, res) => {
    try {

        const course = await Course.findById(req.params.id)
            .populate("teacher", "name email role");

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json(course);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};