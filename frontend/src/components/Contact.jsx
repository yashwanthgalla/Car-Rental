import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <h2 className="contact-title">Contact Us</h2>
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-content">
              <h3 className="info-title">Our Location</h3>
              <p className="info-text">123 Rental Street, Car City, CC 10001</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-content">
              <h3 className="info-title">Call Us</h3>
              <p className="info-text">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">✉️</div>
            <div className="info-content">
              <h3 className="info-title">Email Us</h3>
              <p className="info-text">info@redbullrentals.com</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">⏰</div>
            <div className="info-content">
              <h3 className="info-title">Working Hours</h3>
              <p className="info-text">Monday-Friday: 9am - 7pm<br />Saturday-Sunday: 10am - 5pm</p>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <form>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" className="form-control" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label className="form-label">Your Email</label>
              <input type="email" className="form-control" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input type="text" className="form-control" placeholder="Rental Inquiry" required />
            </div>
            <div className="form-group">
              <label className="form-label">Your Message</label>
              <textarea className="form-control" placeholder="Tell us about your rental needs..." required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;