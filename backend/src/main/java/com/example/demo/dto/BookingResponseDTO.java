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
    
    // Additional car details for frontend
    private String carName;
    private String carImage;
    private String carLocation;
    private Double price;
    private String email;

    public BookingResponseDTO() {}

    public BookingResponseDTO(Long id, Long userId, Long carId, String tripType, String pickupLocation, 
                            LocalDateTime pickupDateTime, int durationHours, String paymentMethod, 
                            String paymentIdentifier, String carName, String carImage, 
                            String carLocation, Double price, String email) {
        this.id = id;
        this.userId = userId;
        this.carId = carId;
        this.tripType = tripType;
        this.pickupLocation = pickupLocation;
        this.pickupDateTime = pickupDateTime;
        this.durationHours = durationHours;
        this.paymentMethod = paymentMethod;
        this.paymentIdentifier = paymentIdentifier;
        this.carName = carName;
        this.carImage = carImage;
        this.carLocation = carLocation;
        this.price = price;
        this.email = email;
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
    
    // New getters and setters
    public String getCarName() { return carName; }
    public void setCarName(String carName) { this.carName = carName; }
    
    public String getCarImage() { return carImage; }
    public void setCarImage(String carImage) { this.carImage = carImage; }
    
    public String getCarLocation() { return carLocation; }
    public void setCarLocation(String carLocation) { this.carLocation = carLocation; }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
