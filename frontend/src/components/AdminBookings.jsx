import React from "react";
import "./Dashboard.css"; // reuse styles if you have them

const AdminBookings = () => {
  return (
    <div className="dashboard-container">
      <h2>Booking Management Section</h2>
      <p>This is where admins can view or manage user bookings.</p>
      <div className="admin-buttons">
      <button onClick={() => navigate("/admin-cars")}>ACCEPT ORDER</button>
      <button onClick={() => navigate("/admin-bookings")}>REJECT ORDER</button></div>
    </div>
  );
};

export default AdminBookings;