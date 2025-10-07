package com.example.demo.dto;

import java.time.LocalDateTime;

public class BookingRequestDTO {

    private Long userId;            // Set internally by backend
    private Long carId;
    private String email;           // Sent from frontend
    private String tripType;        // e.g., "rental"
    private String pickupLocation;
    private LocalDateTime pickupDateTime;
    private int durationHours;
    private String paymentMethod;   // e.g., "CARD"
    private String paymentIdentifier;
    private String selectedPlan;    // "hourly" or "daily"
    private Double price;           // Price sent from frontend

    // ================== Getters & Setters ==================
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTripType() { return tripType; }
    public void setTripType(String tripType) { this.tripType = tripType; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }

    public LocalDateTime getPickupDateTime() { return pickupDateTime; }
    public void setPickupDateTime(LocalDateTime pickupDateTime) { this.pickupDateTime = pickupDateTime; }

    public int getDurationHours() { return durationHours; }
    public void setDurationHours(int durationHours) { this.durationHours = durationHours; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentIdentifier() { return paymentIdentifier; }
    public void setPaymentIdentifier(String paymentIdentifier) { this.paymentIdentifier = paymentIdentifier; }

    public String getSelectedPlan() { return selectedPlan; }
    public void setSelectedPlan(String selectedPlan) { this.selectedPlan = selectedPlan; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
