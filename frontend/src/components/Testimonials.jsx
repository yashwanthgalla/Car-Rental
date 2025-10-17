import React from 'react';
import './Testimonials.css';
import { FaStar } from 'react-icons/fa';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      content: "Absolutely blown away by the service! The premium SUV I rented was immaculate and the doorstep delivery made my business trip hassle-free. Will definitely be my go-to car rental service from now on.",
      author: "Michael Reynolds",
      role: "Business Executive",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      id: 2,
      content: "My family vacation was perfect thanks to the spacious SUV we rented. The comprehensive insurance gave us peace of mind while exploring, and the customer support team was incredibly helpful throughout our journey.",
      author: "Sarah Johnson",
      role: "Travel Blogger",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    },
    {
      id: 3,
      content: "As a photographer constantly on the move, I need reliable transportation. The electric vehicle I rented was not only eco-friendly but also surprisingly powerful. The 24/7 support team was there when I needed assistance with charging stations.",
      author: "David Chen",
      role: "Professional Photographer",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 4
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <h2 className="testimonials-title">Customer Experiences</h2>
      <p className="testimonials-subtitle">
        Discover what our satisfied customers have to say about their experiences with our premium car rental services
      </p>
      <div className="testimonials-container">
        {testimonials.map(testimonial => (
          <div className="testimonial-card" key={testimonial.id}>
            <div className="quote-icon">"</div>
            <p className="testimonial-content">{testimonial.content}</p>
            <div className="testimonial-author">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.author} 
                className="author-avatar" 
              />
              <div className="author-info">
                <h4 className="author-name">{testimonial.author}</h4>
                <p className="author-role">{testimonial.role}</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className="star"
                      style={{ 
                        color: i < testimonial.rating ? 'currentColor' : '#ddd',
                        opacity: i < testimonial.rating ? 1 : 0.5
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;