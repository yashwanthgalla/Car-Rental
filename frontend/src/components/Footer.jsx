import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img className="footer-logo-img" src="\logo\ferrari-logo.png" alt="Ferrari Rentals" />
          <span className="footer-logo-text">Ferrari Rentals</span>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <a href="#services" className="footer-link" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>Services</a>
          <a href="#cars" className="footer-link" onClick={(e) => { e.preventDefault(); document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' }); }}>Find Your Car</a>
          <a href="#testimonials" className="footer-link" onClick={(e) => { e.preventDefault(); document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); }}>Testimonials</a>
          <a href="#contact" className="footer-link" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact Us</a>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Car Categories</h3>
          <a href="#cars" className="footer-link" onClick={(e) => { e.preventDefault(); document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' }); }}>Premium Cars</a>
          <a href="#cars" className="footer-link" onClick={(e) => { e.preventDefault(); document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' }); }}>Sports Cars</a>
          <a href="#cars" className="footer-link" onClick={(e) => { e.preventDefault(); document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' }); }}>Formula One Cars</a>
          <a href="#cars" className="footer-link" onClick={(e) => { e.preventDefault(); document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' }); }}>Electric Cars</a>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Contact Info</h3>
          <div className="footer-contact-info">
            <span className="footer-contact-icon">📍</span>
            <p>123 Ferrari Drive, Luxury District, SF 94102</p>
          </div>
          <div className="footer-contact-info">
            <span className="footer-contact-icon">📞</span>
            <p>+1 (555) FERRARI (337-7274)</p>
          </div>
          <div className="footer-contact-info">
            <span className="footer-contact-icon">✉️</span>
            <p>info@ferrarirentals.com</p>
          </div>
          
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">FB</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">TW</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">IG</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">YT</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ferrari Rentals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;