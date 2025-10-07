package com.example.demo.dto;

import java.time.LocalDateTime;

public class BookingResponseDTO {
    private Long id;
    private Long userId;
    private Long carId;
    private String tripType;
    private String pickupLocation;
    private LocalDateTime pickupDateTime;
    private int durationHours;
    private String paymentMethod;
    private String paymentIdentifier;

    public BookingResponseDTO() {}

    public BookingResponseDTO(Long id, Long userId, Long carId, String tripType, String pickupLocation, LocalDateTime pickupDateTime, int durationHours, String paymentMethod, String paymentIdentifier) {
        this.id = id;
        this.userId = userId;
        this.carId = carId;
        this.tripType = tripType;
        this.pickupLocation = pickupLocation;
        this.pickupDateTime = pickupDateTime;
        this.durationHours = durationHours;
        this.paymentMethod = paymentMethod;
        this.paymentIdentifier = paymentIdentifier;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }
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
}
