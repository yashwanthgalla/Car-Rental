package com.example.demo.service;

import com.example.demo.dto.CarRequestDTO;
import com.example.demo.dto.CarResponseDTO;
import com.example.demo.entity.Car;
import com.example.demo.repository.CarRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public CarResponseDTO addCar(CarRequestDTO dto) {
        Car car = Car.builder()
                .brand(dto.getBrand())
                .model(dto.getModel())
                .pricePerDay(dto.getPricePerDay())
                .available(dto.getAvailable())
                .build();

        Car savedCar = carRepository.save(car);

        return new CarResponseDTO(
                savedCar.getId(),
                savedCar.getBrand(),
                savedCar.getModel(),
                savedCar.getPricePerDay(),
                savedCar.getAvailable()
        );
    }

    public List<CarResponseDTO> getAllCars() {
        return carRepository.findAll().stream()
                .map(car -> new CarResponseDTO(
                        car.getId(),
                        car.getBrand(),
                        car.getModel(),
                        car.getPricePerDay(),
                        car.getAvailable()
                ))
                .collect(Collectors.toList());
    }

    public CarResponseDTO getCarById(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));
        return new CarResponseDTO(
                car.getId(),
                car.getBrand(),
                car.getModel(),
                car.getPricePerDay(),
                car.getAvailable()
        );
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
}
