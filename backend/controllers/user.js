import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../Utils/features.js";

export const signup = async (req, res) => {
  const { username, password, secret } = req.body;

  if (secret !== process.env.SECRET_KEY) {
    return res.status(400).json({ message: "Please provide secret key" });
  }

  console.log(3);

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User({ username, password: hashedPassword });
    await newUser.save();

    console.log(3);

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

    return res.status(201).cookie("user", token, cookieOptions).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;


  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res
      .status(201)
      .cookie("user", token, cookieOptions)
      .json({
        success: true,
        message: `welcome back ${user.username}`,
        user,
      });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const logout = (req, res) => {
  return res
    .status(200)
    .cookie("user", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user);
  return res.status(200).json({ success: true, user });
};
