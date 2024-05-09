import React from "react";
import "./CSS/Dashboard.css";
import Header from "../Components/Header/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h2>Welcome to Admin Panel</h2>
      </div>
    </>
  );
};

export default Dashboard;
