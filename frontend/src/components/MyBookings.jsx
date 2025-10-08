import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyBooking.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // First try to get user ID from backend using email
        if (!userEmail) {
          setError("Please login to view your bookings");
          setLoading(false);
          return;
        }

        // Try to fetch from backend first
        try {
          const userResponse = await axios.get(`http://localhost:8082/api/auth/user?email=${userEmail}`);
          const userId = userResponse.data.id;
          
          const response = await axios.get(`http://localhost:8082/api/bookings/user/${userId}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
          
          console.log("Fetched bookings from backend:", response.data);
          setBookings(response.data);
        } catch (backendError) {
          console.log("Backend fetch failed, trying localStorage fallback:", backendError);
          
          // Fallback to localStorage
          const localBookings = JSON.parse(localStorage.getItem("myBookings")) || [];
          const userBookings = localBookings.filter(booking => 
            booking.email === userEmail || booking.userEmail === userEmail
          );
          
          console.log("Using localStorage bookings:", userBookings);
          setBookings(userBookings);
        }
      } catch (err) {
        console.error("Failed to load bookings:", err);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  if (loading) return (
    <div className="bookings-page">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your bookings...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bookings-page">
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    </div>
  );
  
  if (!bookings.length) return (
    <div className="bookings-page">
      <div className="page-header">
        <button onClick={() => navigate("/")} className="back-btn">
          ← Back to Home
        </button>
        <h1 className="page-title">My Bookings</h1>
        <div className="header-logo">
          <img src="/logo/ferrari-logo.png" alt="Ferrari" className="ferrari-logo" />
        </div>
      </div>
      
      <div className="empty-state">
        <div className="empty-icon">🚗</div>
        <h2>No Bookings Yet</h2>
        <p>You haven't made any car rental bookings yet.</p>
        <button onClick={() => navigate("/")} className="browse-cars-btn">
          Browse Our Cars
        </button>
      </div>
    </div>
  );

  return (
    <div className="bookings-page">
      {/* Header */}
      <div className="page-header">
        <button onClick={() => navigate("/")} className="back-btn">
          ← Back to Home
        </button>
        <h1 className="page-title">My Bookings</h1>
        <div className="header-logo">
          <img src="/logo/ferrari-logo.png" alt="Ferrari" className="ferrari-logo" />
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="bookings-grid">
        {bookings.map((booking, index) => {
          const isUpcoming = new Date(booking.pickupDateTime) > new Date();
          
          return (
            <div key={booking.id || index} className={`booking-card ${isUpcoming ? 'upcoming' : 'completed'}`}>
              {/* Status Badge */}
              <div className="status-badge">
                {isUpcoming ? "🔄 Upcoming" : "✅ Completed"}
              </div>
              
              {/* Car Image and Info */}
              <div className="car-section">
                <div className="car-image-container">
                  <img 
                    src={booking.carImage || booking.car?.image || "/default-car.jpg"} 
                    alt={booking.carName || booking.car?.name || "Car"} 
                    className="car-image"
                    onError={(e) => {
                      e.target.src = "/logo/ferrari-logo.png";
                    }}
                  />
                </div>
                <div className="car-info">
                  <h3 className="car-name">{booking.carName || booking.car?.name || "Unknown Car"}</h3>
                  <p className="car-type">{booking.tripType || booking.selectedPlan || "Rental"}</p>
                  <div className="price-tag">₹{booking.price || booking.totalPrice || "N/A"}</div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="booking-details">
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="detail-icon">📅</div>
                    <div className="detail-content">
                      <div className="detail-label">Booked On</div>
                      <div className="detail-value">
                        {booking.createdAt ? 
                          new Date(booking.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 
                          "Unknown"
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-icon">📍</div>
                    <div className="detail-content">
                      <div className="detail-label">Pickup Location</div>
                      <div className="detail-value">{booking.pickupLocation || booking.carLocation || "N/A"}</div>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-icon">🚗</div>
                    <div className="detail-content">
                      <div className="detail-label">Pickup Date & Time</div>
                      <div className="detail-value">
                        {booking.pickupDateTime ? 
                          new Date(booking.pickupDateTime).toLocaleString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 
                          "N/A"
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-icon">⏰</div>
                    <div className="detail-content">
                      <div className="detail-label">Duration</div>
                      <div className="detail-value">{booking.durationHours || "N/A"} hours</div>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-icon">💳</div>
                    <div className="detail-content">
                      <div className="detail-label">Payment Method</div>
                      <div className="detail-value">{booking.paymentMethod || "N/A"}</div>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">🎫</div>
                    <div className="detail-content">
                      <div className="detail-label">Booking ID</div>
                      <div className="detail-value">{booking.id || booking.paymentIdentifier || "N/A"}</div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="booking-actions">
                  {isUpcoming && (
                    <button className="action-btn modify-btn">
                      📝 Modify
                    </button>
                  )}
                  <button className="action-btn contact-btn">
                    📞 Support
                  </button>
                  {!isUpcoming && (
                    <button className="action-btn review-btn">
                      ⭐ Review
                    </button>
                  )}
                </div>
                
                {booking.source === "localStorage_fallback" && (
                  <div className="sync-notice">
                    <div className="sync-icon">⚠️</div>
                    <span>Stored locally - sync pending</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
