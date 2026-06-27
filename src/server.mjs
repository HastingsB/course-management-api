import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import courseRoutes from "./routes/courseRoutes.mjs";
import errorHandler from "./middleware/errorMiddleware.mjs";
import enrollmentRoutes from "./routes/enrollmentRoutes.mjs";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/enrollments", enrollmentRoutes);

app.get("/", (req, res) => {
    res.send("Course Management API is running...");
});

// Error handling middlewares
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});