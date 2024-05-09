import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    salary: { type: Number, required: true },
    mobileNo: { type: Number, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: [String], required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const Employee = mongoose.model("Employee", EmployeeSchema);
