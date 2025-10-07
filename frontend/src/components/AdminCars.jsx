import React from "react";
import "./Dashboard.css"; // reuse styles if you have them

const AdminCars = () => {
  return (
    <div className="dashboard-container">
      <h2>Car Management Section</h2>
      <p>This is where admins can add, update, or delete cars.</p>
      <div className="admin-buttons">
      <button onClick={() => navigate("/admin-cars")}>ADD CAR</button>
      <button onClick={() => navigate("/admin-bookings")}>REMOVE CAR</button></div>
    </div>
  );
};

export default AdminCars;