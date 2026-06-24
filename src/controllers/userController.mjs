export const getProfile = async (req, res) => {

    res.status(200).json({
        message: "Profile retrieved",
        user: req.user
    });

};

export const adminDashboard = async (req, res) => {

    res.status(200).json({
        message: "Welcome Admin",
        user: req.user
    });

};