import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ onClose, onSignupClick, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("ROLE_USER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState({ question: "", answer: "" });
  const [captchaInput, setCaptchaInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setCaptcha({ question: `${a} + ${b}`, answer: (a + b).toString() });
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
    
    // Add body class to prevent scrolling
    document.body.classList.add('modal-open');
    
    // Cleanup function to remove body class when component unmounts
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (captchaInput.trim() !== captcha.answer) {
      setLoading(false);
      setError("Captcha incorrect. Please try again.");
      generateCaptcha();
      return;
    }

    try {
      const res = await axios.post("http://localhost:8082/api/auth/login", {
        email,
        password,
        role,
      });

      localStorage.setItem("role", res.data.role || role);
      localStorage.setItem("email", res.data.email || email);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setShowSuccess(true);
      onLoginSuccess(res.data.role || role);

      setTimeout(() => {
        if ((res.data.role || role) === "ROLE_ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/"); // Stay on homepage after login
          window.location.reload(); // Refresh to update header state
        }
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials.");
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
      generateCaptcha();
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <div className="login-header">
          <div className="login-title-container">
            <img src="/logo/ferrari-logo.png" alt="Ferrari Logo" className="ferrari-logo" />
            <h2 className="login-title">Ferrari Rentals Login</h2>
          </div>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="login-body">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-control"
                required
              >
                <option value="ROLE_USER">User</option>
                <option value="ROLE_ADMIN">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Captcha: {captcha.question} = ?</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter captcha answer"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
              />
            </div>

            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            {showSuccess && (
              <p className="success-msg">Login Successful ✅ Redirecting...</p>
            )}
            {error && <p className="error-msg">{error}</p>}
          </form>

          <div className="login-footer">
            <a href="#" className="forgot-password">Forgot Password?</a>
            <p className="signup-link">
              Don't have an account?{" "}
              <span
                onClick={onSignupClick}
                style={{ color: "#dc143c", cursor: "pointer", fontWeight: "bold" }}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
