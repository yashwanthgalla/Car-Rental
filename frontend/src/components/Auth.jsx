import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "ROLE_USER",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post("http://localhost:8082/api/auth/login", {
          email: form.email,
          password: form.password,
          role: form.role,
        });
        setMessage(res.data);
      } else {
        // SIGNUP
        const res = await axios.post("http://localhost:8082/api/auth/signup", {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        });
        setMessage(res.data);
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.response?.data || "Error occurred");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {isLogin && (
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
        )}
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: 10 }}>
        {isLogin ? "Switch to Signup" : "Switch to Login"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;
