import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CarDetailModal from "./CarDetailModal";
import "./Cars.css";

const Cars = () => {
  const navigate = useNavigate();
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Car arrays
 const premiumCars = [ { id: 1, image: "p1.jpg", name: "Range Rover", price: "₹25,000/day", hourlyRate: "₹2,500", dailyRate: "₹8,500", capacity: "5 persons", location: "200-298 Clipper St, San Francisco, CA", power: "395 hp @ 5,500 rpm", speed: "225 km/h", acceleration: "6.5 sec 0–60", available: "6", tag: "Premium", features: ["Automatic", "4WD", "Leather"] },
    { id: 2, image: "p2.jpg", name: "Toyota Fortuner", price: "₹4,000/day", hourlyRate: "₹2,250", dailyRate: "₹9,000", capacity: "4 persons", location: "945 Bryant St, San Francisco, CA", power: "204 hp @ 3,400 rpm", speed: "180 km/h", acceleration: "9.8 sec 0–60", available: "7", tag: "Premium", features: ["Automatic", "4WD", "Leather"] },
    { id: 3, image: "p3.jpg", name: "BMW 5 Series", price: "₹5,000/day", hourlyRate: "₹2,500", dailyRate: "₹10,500", capacity: "5 persons", location: "Mission St, San Francisco, CA", power: "335 hp @ 5,500 rpm", speed: "250 km/h", acceleration: "5.2 sec 0–60", available: "1", tag: "Premium", features: ["Automatic", "Leather", "GPS"] },
    { id: 4, image: "p4.jpg", name: "Audi A6", price: "₹6,500/day", hourlyRate: "₹2,750", dailyRate: "₹11,250", capacity: "2 persons", location: "Folsom St, San Francisco, CA", power: "261 hp @ 6,000 rpm", speed: "240 km/h", acceleration: "6.1 sec 0–60", available: "NA", tag: "Premium", features: ["Automatic", "Leather", "GPS"] },
    { id: 5, image: "p5.jpg", name: "Stretch Limousine", price: "₹7,500/day", hourlyRate: "₹3,750", dailyRate: "₹12,500", capacity: "10 persons", location: "Downtown, San Francisco, CA", power: "375 hp @ 5,200 rpm", speed: "180 km/h", acceleration: "10.2 sec 0–60", tag: "VIP", features: ["Chauffeur", "Mini Bar", "Luxury"] }, ];
  const sportsCars = [ { id: 1, image: "sports1.jpeg", name: "Porsche 911", price: "₹5,000/day", hourlyRate: "₹3,000", dailyRate: "₹10,000", capacity: "2 persons", location: "415 Market St, San Francisco, CA", power: "379 hp @ 6,500 rpm", speed: "293 km/h", acceleration: "4.0 sec 0–60", available: "6", tag: "Sports", features: ["Manual", "Turbo"] },
    { id: 2, image: "sports5.jpeg", name: "Ferrari F8", price: "₹5,500/day", hourlyRate: "₹3,250", dailyRate: "₹11,250", capacity: "2 persons", location: "Pier 39, San Francisco, CA", power: "710 hp @ 8,000 rpm", speed: "340 km/h", acceleration: "2.9 sec 0–60", available: "6", tag: "Sports", features: ["Manual", "Turbo"] },
    { id: 3, image: "sports3.jpeg", name: "Lamborghini Huracán", price: "₹6,000/day", hourlyRate: "₹3,500", dailyRate: "₹12,000", capacity: "2 persons", location: "Union Square, San Francisco, CA", power: "631 hp @ 8,000 rpm", speed: "325 km/h", acceleration: "2.8 sec 0–60", available: "6", tag: "Sports", features: ["Automatic", "Turbo"] },
    { id: 4, image: "sports6.jpeg", name: "Mini Cooper S", price: "₹6,500/day", hourlyRate: "₹2,500", dailyRate: "₹9,750", capacity: "2 persons", location: "Castro St, San Francisco, CA", power: "189 hp @ 5,000 rpm", speed: "225 km/h", acceleration: "6.4 sec 0–60", available: "6", tag: "Sports", features: ["Manual", "Turbo"] },
    { id: 5, image: "sports4.jpeg", name: "Bugatti Veyron", price: "₹7,000/day", hourlyRate: "₹4,500", dailyRate: "₹17,500", capacity: "2 persons", location: "Presidio Blvd, San Francisco, CA", power: "1,001 hp @ 6,000 rpm", speed: "407 km/h", acceleration: "2.5 sec 0–60", tag: "Sports", features: ["Automatic", "Turbo"] },
    { id: 6, image: "sports2.jpeg", name: "Aston Martin Vantage", price: "₹7,500/day", hourlyRate: "₹4,000", dailyRate: "₹13,000", capacity: "2 persons", location: "Embarcadero, San Francisco, CA", power: "503 hp @ 6,000 rpm", speed: "314 km/h", acceleration: "3.5 sec 0–60", tag: "Sports", features: ["Manual", "Turbo"] } ,];
  const electricCars = [{ id: 1, image: "electric1.jpg", name: "Tesla Model 3", price: "₹2,500/day", hourlyRate: "₹1,625", dailyRate: "₹7,500", capacity: "5 persons", location: "1 Tesla Rd, Fremont, CA", power: "283 hp", speed: "225 km/h", acceleration: "5.3 sec 0–60", available: "6", tag: "Eco", features: ["Electric", "Automatic"] },
    { id: 2, image: "electric2.jpg", name: "Nissan Leaf", price: "₹2,750/day", hourlyRate: "₹1,500", dailyRate: "₹7,000", capacity: "5 persons", location: "399 Fremont St, San Francisco, CA", power: "147 hp", speed: "144 km/h", acceleration: "7.9 sec 0–60", available: "6", tag: "Eco", features: ["Electric", "Automatic"] },
    { id: 3, image: "electric3.jpg", name: "Chevy Bolt EV", price: "₹3,000/day", hourlyRate: "₹1,750", dailyRate: "₹8,000", capacity: "5 persons", location: "Van Ness Ave, San Francisco, CA", power: "200 hp", speed: "150 km/h", acceleration: "6.5 sec 0–60", available: "6", tag: "Eco", features: ["Electric", "Automatic"] },
    { id: 4, image: "electric4.jpg", name: "Hyundai Ioniq 5", price: "₹3,250/day", hourlyRate: "₹1,875", dailyRate: "₹8,500", capacity: "5 persons", location: "16th St, San Francisco, CA", power: "320 hp", speed: "185 km/h", acceleration: "5.1 sec 0–60", available: "6", tag: "Eco", features: ["Electric", "Automatic"] },
    { id: 5, image: "electric5.jpg", name: "Kia EV6", price: "₹3,500/day", hourlyRate: "₹2,000", dailyRate: "₹9,000", capacity: "5 persons", location: "Battery St, San Francisco, CA", power: "225 hp", speed: "190 km/h", acceleration: "6.2 sec 0–60", tag: "Eco", features: ["Electric", "Automatic"] },
    { id: 6, image: "electric6.jpg", name: "BMW i4", price: "₹3,750/day", hourlyRate: "₹2,125", dailyRate: "₹9,750", capacity: "5 persons", location: "Bush St, San Francisco, CA", power: "335 hp", speed: "225 km/h", acceleration: "5.5 sec 0–60", tag: "Eco", features: ["Electric", "Automatic"] }  ];
  const sedanCars = [ { id: 1, image: "sedan1.jpeg", name: "Toyota Camry", price: "₹2,000/day", hourlyRate: "₹750", dailyRate: "₹3,500", capacity: "4 persons", location: "Howard St, San Francisco, CA", power: "203 hp", speed: "210 km/h", acceleration: "7.6 sec 0–60", available: "6", tag: "Sedan", features: ["Automatic", "A/C"] },
    { id: 2, image: "sedan2.jpeg", name: "Honda Accord", price: "₹2,200/day", hourlyRate: "₹875", dailyRate: "₹4,000", capacity: "4 persons", location: "Pine St, San Francisco, CA", power: "192 hp", speed: "195 km/h", acceleration: "7.2 sec 0–60", available: "6", tag: "Sedan", features: ["Automatic", "A/C"] },
    { id: 3, image: "sedan3.jpeg", name: "Hyundai Elantra", price: "₹2,400/day", hourlyRate: "₹950", dailyRate: "₹4,250", capacity: "5 persons", location: "Polk St, San Francisco, CA", power: "147 hp", speed: "195 km/h", acceleration: "8.1 sec 0–60", available: "6", tag: "Sedan", features: ["Automatic", "A/C"] },
    { id: 4, image: "sedan4.jpeg", name: "Nissan Altima", price: "₹2,000/day", hourlyRate: "₹800", dailyRate: "₹3,750", capacity: "4 persons", location: "Marina Blvd, San Francisco, CA", power: "188 hp", speed: "200 km/h", acceleration: "7.5 sec 0–60", available: "6", tag: "Sedan", features: ["Automatic", "A/C"] },
    { id: 5, image: "sedan5.jpeg", name: "Mazda 6", price: "₹2,200/day", hourlyRate: "₹850", dailyRate: "₹3,875", capacity: "4 persons", location: "Geary Blvd, San Francisco, CA", power: "187 hp", speed: "205 km/h", acceleration: "7.4 sec 0–60", tag: "Sedan", features: ["Automatic", "A/C"] },
    { id: 6, image: "sedan6.jpeg", name: "Kia K5", price: "₹2,400/day", hourlyRate: "₹1,000", dailyRate: "₹4,500", capacity: "5 persons", location: "Haight St, San Francisco, CA", power: "180 hp", speed: "210 km/h", acceleration: "7.0 sec 0–60", available: "6", tag: "Sedan", features: ["Automatic", "A/C"] }  ];

  // Formula 1 Cars (2018-2024) - Track Experience Rentals
  const f1Cars = [
    { id: 1, image: "f1-1.png", name: "Mercedes W11 2020", price: "₹1,920,000/day", hourlyRate: "₹80,000", dailyRate: "₹1,920,000", capacity: "1 person", location: "Ferrari Racing Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "1.6 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 2, image: "f1-2.png", name: "Red Bull RB16 2020", price: "₹1,920,000/day", hourlyRate: "₹80,000", dailyRate: "₹1,920,000", capacity: "1 person", location: "Red Bull Racing Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "1.6 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 3, image: "f1-3.png", name: "Ferrari SF1000 2020", price: "₹1,920,000/day", hourlyRate: "₹80,000", dailyRate: "₹1,920,000", capacity: "1 person", location: "Mercedes F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "1.7 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 4, image: "f1-4.png", name: "McLaren MCL35 2020", price: "₹1,920,000/day", hourlyRate: "₹80,000", dailyRate: "₹1,920,000", capacity: "1 person", location: "McLaren Racing Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "1.7 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
        { id: 5, image: "f1-5.png", name: "Mercedes W12 2021", price: "₹2,160,000/day", hourlyRate: "₹90,000", dailyRate: "₹2,160,000", capacity: "1 person", location: "Alpine F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "1.8 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 6, image: "f1-6.png", name: "Red Bull RB16B 2021", price: "₹2,160,000/day", hourlyRate: "₹90,000", dailyRate: "₹2,160,000", capacity: "1 person", location: "Aston Martin F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "1.8 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 7, image: "f1-7.png", name: "Ferrari SF21 2021", price: "₹2,160,000/day", hourlyRate: "₹90,000", dailyRate: "₹2,160,000", capacity: "1 person", location: "Williams F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "1.9 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 8, image: "f1-8.png", name: "McLaren MCL35M 2021", price: "₹2,160,000/day", hourlyRate: "₹90,000", dailyRate: "₹2,160,000", capacity: "1 person", location: "Haas F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "1.9 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },,
    { id: 6, image: "f1-6.png", name: "Red Bull RB16B 2021", price: "₹2,160,000/day", hourlyRate: "₹90,000", dailyRate: "₹90,000", capacity: "1 person", location: "Aston Martin F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "1.8 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 7, image: "f1-7.png", name: "Ferrari SF21 2021", price: "₹2,160,000/day", hourlyRate: "₹90,000", dailyRate: "₹90,000", capacity: "1 person", location: "Williams F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "1.9 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 8, image: "f1-8.png", name: "McLaren MCL35M 2021", price: "₹2,160,000/day", hourlyRate: "₹90,000", dailyRate: "₹90,000", capacity: "1 person", location: "Haas F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "1.9 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 9, image: "f1-9.png", name: "Mercedes W13 2022", price: "₹2,400,000/day", hourlyRate: "₹1,00,000", dailyRate: "₹2,400,000", capacity: "1 person", location: "Ferrari Racing Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "2.0 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 10, image: "f1-10.png", name: "Red Bull RB18 2022", price: "₹2,400,000/day", hourlyRate: "₹1,00,000", dailyRate: "₹2,400,000", capacity: "1 person", location: "Red Bull Racing Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration:"1.9 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 11, image: "f1-11.png", name: "Ferrari SF-23 2023", price: "₹2,640,000/day", hourlyRate: "₹1,10,000", dailyRate: "₹2,640,000", capacity: "1 person", location: "Mercedes F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "2.0 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 12, image: "f1-12.png", name: "McLaren MCL60 2023", price: "₹2,640,000/day", hourlyRate: "₹1,10,000", dailyRate: "₹2,640,000", capacity: "1 person", location: "McLaren Racing Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "2.1 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 13, image: "f1-13.png", name: "Mercedes W14 2024", price: "₹2,880,000/day", hourlyRate: "₹1,20,000", dailyRate: "₹2,880,000", capacity: "1 person", location: "Alpine F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "2.1 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 14, image: "f1-14.png", name: "Red Bull RB19 2024", price: "₹2,880,000/day", hourlyRate: "₹1,20,000", dailyRate: "₹2,880,000", capacity: "1 person", location: "Aston Martin F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "2.2 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 15, image: "f1-15.png", name: "Ferrari SF-24 2024", price: "₹2,880,000/day", hourlyRate: "₹1,20,000", dailyRate: "₹2,880,000", capacity: "1 person", location: "Williams F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "2.2 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] },
    { id: 16, image: "f1-16.png", name: "McLaren MCL60 2024", price: "₹2,880,000/day", hourlyRate: "₹1,20,000", dailyRate: "₹2,880,000", capacity: "1 person", location: "Haas F1 Center, CA", power: "1000+ hp", speed: "370+ km/h", acceleration: "2.3 sec 0–60", available: "1", tag: "F1", features: ["Formula 1", "Track Only", "Professional Driver Required"] }
  ];

  const handleRentNow = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  // Render a section with horizontal scroll
  const renderSection = (title, cars) => (
    <div className="cars-section-wrapper">
      <h2>{title}</h2>
      <div className="cars-scroll-container">
        {cars.map(car => (
          <div key={car.id} className="car-card" data-tag={car.tag}>
            <div className="car-tag">{car.tag}</div>
            <img src={car.image} alt={car.name} className="car-image" />
            <div className="car-content">
              <h3 className="car-name">{car.name}</h3>
              <p className="car-price">Price: {car.price}</p>
              <p className="car-features">Features: {car.features.join(", ")}</p>
              <button 
                className="view-details-btn" 
                onClick={() => handleRentNow(car)} 
                disabled={bookingLoading}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div id="cars" className="cars-main-section">
      {renderSection("Premium Cars", premiumCars)}
      {renderSection("Sports Cars", sportsCars)}
      {renderSection("Formula 1 Cars", f1Cars)}
      {renderSection("Electric Cars", electricCars)}
      {renderSection("Sedan Cars", sedanCars)}
      
      {showModal && selectedCar && (
        <CarDetailModal
          car={selectedCar}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Cars;
