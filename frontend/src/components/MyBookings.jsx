import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/bookings?user_id=${userId}`);
        console.log("Fetched bookings:", response.data);
        setBookings(response.data);
      } catch (err) {
        console.error("Failed to load bookings:", err.response?.data || err);
        setError(err.response?.data?.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p>{error}</p>;
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div>
      <h2>My Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Car</th>
            <th>Trip Type</th>
            <th>Price</th>
            <th>Pickup</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.car?.brand} {b.car?.model}</td>
              <td>{b.trip_type}</td>
              <td>₹{b.price}</td>
              <td>{b.pickup_location} ({b.pickup_date_time})</td>
              <td>{b.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
