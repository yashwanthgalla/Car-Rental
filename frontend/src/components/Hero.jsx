import React from "react";
import "./Hero.css";

const Hero = () => {
  const scrollToServices = () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">

        <h2 className="hero-title">Premium Car Rental Experience</h2>
        <p className="hero-subtitle">Discover our exclusive selection of luxury, sports, and electric vehicles for an unforgettable journey</p>
        <div className="hero-buttons">
          <button className="hero-button" onClick={() => document.getElementById('cars').scrollIntoView({ behavior: 'smooth' })}>
            Find Your Car
          </button>
          <button className="hero-button-secondary" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>
            Our Services
          </button>
        </div>


      <div className="hero-scroll-indicator" onClick={scrollToServices}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.414L3.293 8.707a1 1 0 011.414-1.414L12 14.586l7.293-7.293a1 1 0 111.414 1.414L12 17.414z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;