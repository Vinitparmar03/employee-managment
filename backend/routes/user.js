import express from "express";
import { getMyProfile, login, logout, signup } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const app = express.Router();

app.post("/signup", signup);

app.post("/login", login);

app.post("/logout", logout);

app.get("/me", isAuthenticated, getMyProfile);

export default app;
