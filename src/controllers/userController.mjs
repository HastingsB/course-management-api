import User from "../models/userModel.mjs";

// Get user profile
export const getProfile = async (req, res) => {

    res.status(200).json({
        message: "Profile retrieved",
        user: req.user
    });

};

// Admin dashboard
export const adminDashboard = async (req, res) => {

    res.status(200).json({
        message: "Welcome Admin",
        user: req.user
    });

};

// Approve a teacher
export const approveTeacher = async (req, res) => {
    try {
        
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.role = "teacher";
        user.isApproved = true;

        await user.save();

        res.status(200).json({
            message: "Teacher approved successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};