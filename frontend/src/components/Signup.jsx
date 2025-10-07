import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = ({ onClose, onLoginClick }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Add body class to prevent scrolling
    document.body.classList.add('modal-open');
    
    // Cleanup function to remove body class when component unmounts
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
     const res = await axios.post("http://localhost:8082/api/auth/signup", {
  fullName,
  email,
  password,
  phone
}, {
  headers: {
    'Content-Type': 'application/json'
  }
});


      // Save role/email/token for future requests
      localStorage.setItem("role", res.data.role || "ROLE_USER");
      localStorage.setItem("email", res.data.email || email);
     

      setSuccess(true);
      setTimeout(() => {
        onClose(); // close modal after success
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
      setFullName("");
      setEmail("");
      setPassword("");
      setPhone("");
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal">
        <div className="signup-header">
          <div className="signup-title-container">
            <img src="/logo/ferrari-logo.png" alt="Ferrari Logo" className="ferrari-logo" />
            <h2 className="signup-title">Join Ferrari Rentals</h2>
          </div>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Signing up..." : "SIGNUP"}
          </button>

          {success && <p className="success-msg">Signup Successful ✅</p>}
          {error && <p className="error-msg">{error}</p>}

          <div className="signup-footer">
            <p className="signup-link">
              Already have an account?{" "}
              <span
                onClick={onLoginClick}
                style={{ color: "var(--ferrari-red)", cursor: "pointer", fontWeight: "bold" }}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
