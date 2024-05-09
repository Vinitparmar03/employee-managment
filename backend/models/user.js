import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", UserSchema);
