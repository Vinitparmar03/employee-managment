import { Employee } from "../models/employee.js";
import { rm } from "fs";

export const addEmployee = async (req, res) => {
  const { name, designation, salary, mobileNo, course, gender, email } =
    req.body;

  const image = req.file;

  if (
    !name ||
    !designation ||
    !salary ||
    !image ||
    !mobileNo ||
    !course ||
    !gender ||
    !email
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (mobileNo.length !== 10) {
    return res
      .status(400)
      .json({ phoneMessage: "Mobile number must be 10 digits" });
  }

  try {
    const newEmployee = new Employee({
      name,
      designation,
      salary,
      image: image.path,
      mobileNo,
      course: course.split(","),
      gender,
      email,
    });
    await newEmployee.save();
    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add employee" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve employees" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    rm(employee.image, () => {
      console.log("image Deleted");
    });

    await Employee.findByIdAndDelete(id);
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete employee" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, designation, salary, mobileNo, course, gender, email } =
    req.body;
  const image = req.file;

  if (mobileNo.length !== 10) {
    return res
      .status(400)
      .json({ phoneMessage: "Mobile number must be 10 digits" });
  }

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (image) {
      rm(employee.image, () => {
        console.log("Old image Deleted");
      });
      employee.image = image.path;
    }

    employee.name = name || employee.name;
    employee.designation = designation || employee.designation;
    employee.salary = salary || employee.salary;
    employee.mobileNo = mobileNo || employee.mobileNo;
    employee.course = course.split(",") || employee.course;
    employee.gender = gender || employee.gender;
    employee.email = email || employee.email;

    const updatedEmployee = await employee.save();
    res.json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update employee" });
  }
};

export const getSingleEmployee = async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findById(id);
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  return res.status(200).json({ success: true, employee: employee });
};
