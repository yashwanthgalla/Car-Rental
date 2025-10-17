import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Default to "User" if role is not provided
  const role = location.state?.role || "User";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000); // redirects to homepage after 2 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome {role}! 🎉</h1>
      <p>Redirecting to home page...</p>
    </div>
  );
};

export default WelcomePage;