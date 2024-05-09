import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./Utils/features.js";
import employeeRoutes from "./routes/employee.js";
import userRoutes from "./routes/user.js";

dotenv.config({
  path: "./.env",
});
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB Connection
connectDB(mongoURI);

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/employees", employeeRoutes);

app.use("/uploads", express.static("uploads"));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
