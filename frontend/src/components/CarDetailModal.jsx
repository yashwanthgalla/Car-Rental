import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CarDetailModal.css";

const indianLocations = [
  "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Ahmedabad",
  "Chennai", "Kolkata", "Pune", "Jaipur", "Lucknow",
  "Bhopal", "Chandigarh", "Goa", "Nagpur", "Indore", "Vijayawada", "Guntur"
];

const todayDate = "2025-05-10"; // Set this dynamically in production

const CarDetailModal = ({ car, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState("hourly");
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [durationDays, setDurationDays] = useState("0");
  const [durationHours, setDurationHours] = useState("0");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!car) return null;

  const price = selectedPlan === "hourly" ? car.hourlyRate : car.dailyRate;

  const handlePickUp = async () => {
    const totalHours = parseInt(durationDays) * 24 + parseInt(durationHours);

    if (!pickupLocation || !pickupDate || !pickupTime) {
      setError("Please fill all required fields.");
      return;
    }

    if (totalHours < 3) {
      setError("Minimum trip duration must be at least 3 hours.");
      return;
    }

    setError("");

    const tripDetails = {
      pickupLocation,
      pickupDate,
      pickupTime,
      duration: `${durationDays} days ${durationHours} hours`
    };

    // Navigate to payment page
    navigate("/payment", {
      state: {
        car,
        selectedPlan,
        price,
        tripDetails: tripDetails
      }
    });
    
    onClose(); // Close the modal
  };

  return (
    <div className="car-modal-overlay">
      <div className="car-modal-horizontal">
        <div className="left-section">
          <img className="modal-car-image" src={car.image} alt={car.name} />
        </div>

        <div className="right-section">
          <div className="modal-header">
            <button className="modal-back" onClick={onClose}>←</button>
            <button className="modal-fav">♡</button>
          </div>

          <h2 className="car-title">{car.name}</h2>
          <p className="rating">⭐ 4.9 <span className="muted">(230 Reviews)</span></p>

          <div className="specs-row">
            <div className="spec">
              <p className="label">Power</p>
              <p className="value">{car.power}</p>
            </div>
            <div className="spec">
              <p className="label">Max Speed</p>
              <p className="value">{car.speed}</p>
            </div>
            <div className="spec">
              <p className="label">Acceleration</p>
              <p className="value">{car.acceleration}</p>
            </div>
            <div>
              <p className="attribute-label">Available</p>
              <p className="attribute-value">{car.available || "5"}</p>
            </div>
          </div>

          {/* Trip Booking Form */}
          <div className="trip-booking-form">
            <h3 className="form-title">Trip Details</h3>
            
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">PICK UP LOCATION</label>
                <select 
                  className="form-select"
                  value={pickupLocation} 
                  onChange={(e) => setPickupLocation(e.target.value)}
                >
                  <option value="">Select Location</option>
                  {indianLocations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">PICK-UP DATE</label>
                <input
                  className="form-input"
                  type="date"
                  min={todayDate}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="form-label">PICK-UP TIME</label>
                <input
                  className="form-input"
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">DURATION</label>
                <div className="duration-selects">
                  <select 
                    className="form-select duration-select"
                    value={durationDays} 
                    onChange={(e) => setDurationDays(e.target.value)}
                  >
                    {[...Array(31).keys()].map(day => (
                      <option key={day} value={day}>{day} day{day !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  <select 
                    className="form-select duration-select"
                    value={durationHours} 
                    onChange={(e) => setDurationHours(e.target.value)}
                  >
                    {[...Array(24).keys()].map(hour => (
                      <option key={hour} value={hour}>{hour} hr{hour !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {error && (
              <p className="error-message">{error}</p>
            )}
          </div>

          <div className="plan">
            <p className="label">Plan</p>
            <div className="plan-options">
              <button className={selectedPlan === "hourly" ? "active" : ""} onClick={() => setSelectedPlan("hourly")}>
                Hourly Rent<br /><span>{car.hourlyRate}</span>
              </button>
              <button className={selectedPlan === "daily" ? "active" : ""} onClick={() => setSelectedPlan("daily")}>
                Daily Rent<br /><span>{car.dailyRate}</span>
              </button>
            </div>
          </div>

          <div className="location">
            <p className="label">Location</p>
            <p className="value">📍 {car.location}</p>
          </div>

          <div className="modal-footer">
            <h3 className="price">{price} <span>/ {selectedPlan}</span></h3>
            <button className="pickup-btn" onClick={handlePickUp}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailModal;
