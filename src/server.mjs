import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";

dotenv.config();

const app = express();

app.use(express.json());

// Connect database
connectDB();

// Test route
app.get("/", (req, res) => {
    res.send("Course Management API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});