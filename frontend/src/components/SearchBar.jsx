import React, { useState } from "react";
import "./SearchBar.css";

const indianLocations = [
  "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Ahmedabad",
  "Chennai", "Kolkata", "Pune", "Jaipur", "Lucknow",
  "Bhopal", "Chandigarh", "Goa", "Nagpur", "Indore", "Vijayawada", "Guntur"
];

const todayDate = "2025-05-10"; // Set this dynamically in production

const SearchBar = ({ setSearchData }) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [durationDays, setDurationDays] = useState("0");
  const [durationHours, setDurationHours] = useState("0");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
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

    const searchInfo = {
      pickupLocation,
      pickupDate,
      pickupTime,
      duration: `${durationDays} days ${durationHours} hours`
    };

    localStorage.setItem("tripDetails", JSON.stringify(searchInfo));
    setSearchData(searchInfo);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="search-bar">
      <div className="field">
        <label>TRIP TYPE</label>
        <select>
          <option>Rentals</option>
        </select>
      </div>

      <div className="field">
        <label>PICK UP LOCATION</label>
        <select value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
          <option value="">Select Location</option>
          {indianLocations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>PICK - UP DATE</label>
        <input
          type="date"
          min={todayDate}
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />
      </div>

      <div className="field">
        <label>PICK-UP TIME</label>
        <input
          type="time"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
        />
      </div>

      <div className="field">
        <label>DURATION</label>
        <div style={{ display: "flex", gap: "10px" }}>
          <select value={durationDays} onChange={(e) => setDurationDays(e.target.value)}>
            {[...Array(31).keys()].map(day => (
              <option key={day} value={day}>{day} day{day !== 1 ? 's' : ''}</option>
            ))}
          </select>
          <select value={durationHours} onChange={(e) => setDurationHours(e.target.value)}>
            {[...Array(24).keys()].map(hour => (
              <option key={hour} value={hour}>{hour} hr{hour !== 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="search-btn" onClick={handleSearch}>ENTER</button>

      {showSuccess && (
        <p className="success-msg">
          Yes, our cars and services are available in that location ✅
        </p>
      )}

      {error && (
        <p className="error-msg" style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default SearchBar;