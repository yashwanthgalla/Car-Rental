import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import PaymentPage from "./components/PaymentPage";
import AdminDashboard from "./components/AdminDashboard";
import AdminCars from "./components/AdminCars";
import AdminBookings from "./components/AdminBookings";
import MyBookings from "./components/MyBookings";
import "./App.css";

const App = () => {
  const [userRole, setUserRole] = useState("");

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  // Debug
  useEffect(() => {
    console.log("Current Role:", userRole);
  }, [userRole]);

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage userRole={userRole} />} />
          <Route path="/login" element={<Login onLoginSuccess={setUserRole} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/mybookings" element={<MyBookings />} />

            {/* Admin Routes - Protected */}
            <Route
              path="/admin-dashboard"
              element={
                userRole === "admin" ? <AdminDashboard /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/admin-cars"
              element={
                userRole === "admin" ? <AdminCars /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/admin-bookings"
              element={
                userRole === "admin" ? <AdminBookings /> : <Navigate to="/" replace />
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
