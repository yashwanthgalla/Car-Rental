import React, { useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import Cars from "./Cars";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";

const HomePage = () => {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <main>
        <Services />
        <Cars />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;