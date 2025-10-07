package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String model;
    private Double pricePerDay;
    private Boolean available;

    // --- Constructors ---
    public Car() {}

    public Car(Long id, String brand, String model, Double pricePerDay, Boolean available) {
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

    // --- Manual Builder ---
    public static class Builder {
        private Long id;
        private String brand;
        private String model;
        private Double pricePerDay;
        private Boolean available;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder brand(String brand) { this.brand = brand; return this; }
        public Builder model(String model) { this.model = model; return this; }
        public Builder pricePerDay(Double pricePerDay) { this.pricePerDay = pricePerDay; return this; }
        public Builder available(Boolean available) { this.available = available; return this; }

        public Car build() {
            return new Car(id, brand, model, pricePerDay, available);
        }
    }

    public static Builder builder() { return new Builder(); }
}
