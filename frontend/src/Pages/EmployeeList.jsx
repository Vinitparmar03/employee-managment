import React, { useEffect, useState } from "react";
import TableHOC from "../Components/Table/TableHOC";
import { sampleEmployees } from "../constants/sampledata";
import Header from "../Components/Header/Header";
import {
  employeeAPI,
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../Redux/api/employee";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const columns = [
  {
    Header: "uniqueId",
    accessor: "uniqueId",
  },
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Mobile No.",
    accessor: "mobileNo",
  },
  {
    Header: "Designation",
    accessor: "designation",
  },
  {
    Header: "Salary",
    accessor: "salary",
  },
  {
    Header: "Course",
    accessor: "course",
  },
  {
    Header: "Create Date",
    accessor: "createDate",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const EmployeeList = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { data, isLoading } = useGetEmployeesQuery();

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleEdit = async (employeeId) => {
    navigate(`/updateemployee/${employeeId}`);
  };
  const handleDelete = async (employeeId) => {
    const confirm = window.confirm("Are you sure you want to delete?");

    if (!confirm) return;

    const res = await deleteEmployee(employeeId);

    if (res) {
      toast.success(res.data.message);
    }
  };

  useEffect(() => {
    if (data && data.employees) {
      console.log(data.employees);
      setRows(
        data?.employees?.map((i) => ({
          uniqueId: i._id,
          avatar: (
            <img
              style={{
                borderRadius: "50%",
              }}
              src={`http://localhost:5000/${i.image}`}
            />
          ),
          name: i.name,
          email: i.email,
          mobileNo: i.mobileNo,
          designation: i.designation,
          salary: i.salary,
          gender: i.gender,
          course: i.course.join(", "),
          createDate: i.createdAt,
          action: (
            <>
              <button
                onClick={() => handleEdit(i._id)}
                style={{ fontSize: "15px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(i._id)}
                style={{ fontSize: "15px" }}
              >
                Delete
              </button>
            </>
          ),
        }))
      );
    }
  }, [data]);
  const Table = TableHOC(columns, rows, rows.length > 6)();
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? <h1>loading...</h1> : Table}
      </div>
    </>
  );
};

export default EmployeeList;
