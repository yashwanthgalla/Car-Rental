import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import "./Header.css";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.removeItem("role");
    setLogoutMessage(true);
    setTimeout(() => setLogoutMessage(false), 3000);
  };

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo-container">
          <img className="logo" src="\logo\ferrari-logo.png" alt="Ferrari" />
          <h1 className="brand-name">Ferrari Rentals</h1>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <a className="nav-link" href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Services</a>
          <a className="nav-link" href="#cars" onClick={(e) => { e.preventDefault(); document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Find Your Car</a>
          <a className="nav-link" href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Contact</a>
          {isLoggedIn && userRole === "user" && (
            <Link to="/maintenance" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Maintenance
            </Link>
          )}
          {isLoggedIn && userRole === "user" && (
            <Link to="/mybookings" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              MyBookings
            </Link>
          )}

          {isLoggedIn ? (
            <button className="auth-button logout-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button className="auth-button login-btn" onClick={() => setShowLogin(true)}>Login</button>
              <button className="auth-button signup-btn" onClick={() => setShowSignup(true)}>Signup</button>
            </>
          )}
        </nav>
      </header>

      {logoutMessage && (
        <div className="logout-toast">
          Logout successful ✅
        </div>
      )}

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSignupClick={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onLoginSuccess={(role) => {
            setIsLoggedIn(true);
            setUserRole(role);
            localStorage.setItem("role", role);
          }}
        />
      )}

      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onLoginClick={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

export default Header;