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