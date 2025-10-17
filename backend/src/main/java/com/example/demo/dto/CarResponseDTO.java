package com.example.demo.dto;

public class CarResponseDTO {
    private Long id;
    private String brand;
    private String model;
    private Double pricePerDay;
    private Boolean available;

    // --- Constructors ---
    public CarResponseDTO() {}
    public CarResponseDTO(Long id, String brand, String model, Double pricePerDay, Boolean available) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.pricePerDay = pricePerDay;
        this.available = available;
    }

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Double getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(Double pricePerDay) { this.pricePerDay = pricePerDay; }

    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }
}
