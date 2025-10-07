import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { car, selectedPlan, price, tripDetails } = state || {};
  const [paymentMode, setPaymentMode] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);

  if (!car) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>
      No car selected. Please go back and try again.
    </p>;
  }

  const handlePayment = (e) => {
    e.preventDefault();

    // Save booking data in localStorage
    const existingBookings = JSON.parse(localStorage.getItem("myBookings")) || [];
    const newBooking = { car, selectedPlan, price, tripDetails };
    localStorage.setItem("myBookings", JSON.stringify([...existingBookings, newBooking]));

    setShowSuccess(true);
    // Removed automatic redirection - users can now manually choose where to go
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Summary</h2>

      <div className="payment-content">
        {/* Car Summary */}
        <div className="car-summary">
          <img src={car.image} alt={car.name} className="car-summary-image" />
          <h3>{car.name}</h3>
          <p><strong>Plan:</strong> {selectedPlan}</p>
          <p><strong>Price:</strong> {price}</p>
          <p><strong>Location:</strong> {car.location}</p>
        </div>

        {/* Trip & Payment */}
        <div className="trip-summary">
          <h3>Trip Details</h3>
          <p><strong>Pickup Location:</strong> {tripDetails?.pickupLocation || "Not Provided"}</p>
          <p><strong>Pickup Date:</strong> {tripDetails?.pickupDate || "Not Provided"}</p>
          <p><strong>Pickup Time:</strong> {tripDetails?.pickupTime || "Not Provided"}</p>
          <p><strong>Duration:</strong> {tripDetails?.duration || "Not Provided"}</p>

          <h3>Choose Payment Method</h3>
          <div className="payment-options">
            <button
              className={`payment-btn ${paymentMode === "card" ? "active" : ""}`}
              onClick={() => setPaymentMode("card")}
            >
              💳 Pay by Card
            </button>
            <button
              className={`payment-btn ${paymentMode === "upi" ? "active" : ""}`}
              onClick={() => setPaymentMode("upi")}
            >
              🏦 Pay by UPI
            </button>
          </div>

          <div className="payment-method-fields fade-in">
            {paymentMode === "card" && (
              <form className="payment-form" onSubmit={handlePayment}>
                <input type="text" placeholder="Name on Card" required maxLength="30" />
                <input type="text" placeholder="Card Number" required pattern="\d{16}" inputMode="numeric" maxLength="16" />
                <input type="text" placeholder="Expiry (MM/YY)" required pattern="(0[1-9]|1[0-2])/\d{2}" />
                <input type="text" placeholder="CVV" required pattern="\d{3}" inputMode="numeric" maxLength="3" />
                <input type="text" placeholder="Aadhar Number" required pattern="\d{12}" inputMode="numeric" maxLength="12" />
                <button type="submit" className="confirm-btn">Confirm Card Payment</button>
              </form>
            )}

            {paymentMode === "upi" && (
              <form className="payment-form" onSubmit={handlePayment}>
                <input type="text" placeholder="Enter UPI ID" required pattern="^[\w.-]+@[\w]+$" />
                <input type="text" placeholder="Aadhar Number" required pattern="\d{12}" inputMode="numeric" maxLength="12" />
                <button type="submit" className="confirm-btn">Confirm UPI Payment</button>
              </form>
            )}
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="gp-success">
          <div className="gp-card" role="status" aria-live="polite" aria-label="Payment successful">
            <div className="gp-check">
              {/* Animated SVG check */}
              <svg viewBox="0 0 52 52" className="gp-check-svg" aria-hidden="true">
                <circle className="gp-check-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="gp-check-mark" fill="none" d="M14 27 l8 8 l16 -18" />
              </svg>
            </div>

            <div className="gp-body">
              <div className="gp-title">Payment successful</div>
              <div className="gp-amount">{price}</div>
              <div className="gp-meta">Paid to <strong>Ferrari Rentals</strong> • {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            </div>

            <div className="gp-actions">
              <button className="btn btn-ghost" onClick={() => { setShowSuccess(false); navigate("/"); }}>Done</button>
              <button className="btn btn-outline" onClick={() => navigate("/my-bookings")}>View Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;