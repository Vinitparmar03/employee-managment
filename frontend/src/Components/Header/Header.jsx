import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";
import toast from "react-hot-toast";
import { useLogoutUserMutation } from "../../Redux/api/user";
import { userNotExist } from "../../Redux/Reducer/userReducer";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    const { data } = await logoutUser();
    if (data) {
      toast.success(data.message);
    }
    dispatch(userNotExist());
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/employeeList">Employee List</Link>
          </li>
          <li>
            <Link to="/addEmployee">Add Employee</Link>
          </li>

          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
