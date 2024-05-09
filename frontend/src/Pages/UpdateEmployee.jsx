import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../Redux/api/employee";
import "./CSS/AddEmployee.css";
import toast from "react-hot-toast";

const UpdateEmployee = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleEmployeeQuery(id);

  const [employeeData, setEmployeeData] = useState({
    name: "",
    gender: "",
    email: "",
    mobileNo: "",
    designation: "",
    salary: "",
    course: [],
    image: null,
  });

  useEffect(() => {
    if (!isLoading && data?.employee) {
      const {
        name,
        gender,
        email,
        mobileNo,
        designation,
        salary,
        course,
        image,
      } = data.employee;
      setEmployeeData({
        name: name || "",
        gender: gender || "",
        email: email || "",
        mobileNo: mobileNo || "",
        designation: designation || "",
        salary: salary || "",
        course: course || [],
        image: image || null,
      });
    }
  }, [data, isLoading]);

  const [updateEmployee, { error }] = useUpdateEmployeeMutation();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      let updatedCourse;

      if (checked) {
        updatedCourse = [...employeeData.course, value]; // Add new course
      } else {
        updatedCourse = employeeData.course.filter(
          (course) => course !== value
        );
      }

      setEmployeeData({ ...employeeData, course: updatedCourse });
    } else if (type === "file") {
      setEmployeeData({ ...employeeData, [name]: files[0] });
    } else {
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employeeData.name);
    formData.append("gender", employeeData.gender);
    formData.append("email", employeeData.email);
    formData.append("mobileNo", employeeData.mobileNo);
    formData.append("designation", employeeData.designation);
    formData.append("salary", employeeData.salary);
    formData.append("course", employeeData.course);
    formData.append("image", employeeData.image);

    const res = await updateEmployee({ employeeId: id, formData });

    if (res) {
      toast.success(res.data.message);
    }
  };

  return isLoading ? (
    <h1>loading...</h1>
  ) : (
    <div className="add-employee-form">
      <div className="form-container">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={employeeData.name}
            onChange={handleChange}
          />
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={employeeData.gender === "Male"}
                onChange={handleChange}
                style={{ marginRight: "3px" }}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={employeeData.gender === "Female"}
                onChange={handleChange}
                style={{ marginRight: "3px" }}
              />
              Female
            </label>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={employeeData.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="mobileNo"
            placeholder="Mobile No."
            value={employeeData.mobileNo}
            onChange={handleChange}
            maxLength={10}
          />
          {error?.data?.phoneMessage && (
            <p
              style={{
                color: "red",
                margin: "0px 0 10px",
                fontSize: "12px",
              }}
            >
              {error?.data?.phoneMessage}
            </p>
          )}
          <select
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={employeeData.salary}
            onChange={handleChange}
          />
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={employeeData.course.includes("BCA")}
                onChange={handleChange}
                style={{ marginRight: "3px" }}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={employeeData.course.includes("MCA")}
                onChange={handleChange}
                style={{ marginRight: "3px" }}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={employeeData.course.includes("BSC")}
                onChange={handleChange}
                style={{ marginRight: "3px" }}
              />
              BSC
            </label>
          </div>
          <div className="file-upload">
            <label>
              <input
                type="file"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit">Edit Employee</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
