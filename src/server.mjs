import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.mjs";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Course Management API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});