// AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Optional: enhance dashboard styles

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! You can manage users, cars, and view reports here.</p>

      <div className="admin-buttons">
        <button onClick={() => navigate("/admin-cars")}>Car Section</button>
        <button onClick={() => navigate("/admin-bookings")}>Bookings Section</button>
      </div>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
