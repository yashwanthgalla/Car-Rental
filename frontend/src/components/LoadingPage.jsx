import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoadingPage.css";

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, redirectTo, isInitialLoad } = location.state || {};

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (isInitialLoad) {
        // If it's initial load, redirect to homepage
        navigate("/", { replace: true });
      } else if (role === "ROLE_ADMIN") {
        navigate("/admin-dashboard");
      } else if (redirectTo) {
        navigate(redirectTo);
      } else {
        navigate("/welcome", { state: { role } });
      }
    }, 3000); // 3 seconds loading

    return () => clearTimeout(timer);
  }, [navigate, role, redirectTo, isInitialLoad]);

  return (
    <div className="loading-page">
      <div className="loading-container">
        {/* Ferrari Logo */}
        <div className="loading-logo">
          <img src="/logo/ferrari-logo.png" alt="Ferrari Logo" className="ferrari-loading-logo" />
        </div>

        {/* Loading Animation */}
        <div className="loading-animation">
          <div className="car-loader">
            <div className="car-body"></div>
            <div className="car-wheel wheel-front"></div>
            <div className="car-wheel wheel-rear"></div>
          </div>
          <div className="road"></div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <h2 className="welcome-message">Welcome to Ferrari Rentals!</h2>
          <p className="loading-status">
            {isInitialLoad ? "Loading your experience..." : "Preparing your dashboard..."}
          </p>
          
          {/* Loading Dots */}
          <div className="loading-dots">
            <span className="dot dot1"></span>
            <span className="dot dot2"></span>
            <span className="dot dot3"></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-text">Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;