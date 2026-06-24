import jwt from "jsonwebtoken";
import User from "../models/userModel.mjs";

const protect = async (req, res, next) => {
    try {

        let token;

        // Check Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            // Get token from headersss
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Find user and attach to request
            req.user = await User.findById(decoded.id)
                .select("-password");

            return next();
        }

        return res.status(401).json({
            message: "Not authorized, token missing"
        });

    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, token invalid"
        });
    }
};

export default protect;