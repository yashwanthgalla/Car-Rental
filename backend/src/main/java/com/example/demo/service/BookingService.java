package com.example.demo.service;

import com.example.demo.dto.BookingRequestDTO;
import com.example.demo.dto.BookingResponseDTO;
import com.example.demo.entity.Booking;
import com.example.demo.entity.Car;
import com.example.demo.entity.User;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.CarRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, CarRepository carRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
    }

    public BookingResponseDTO createBooking(BookingRequestDTO dto) {
        User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        
        // Handle car lookup by name, create if doesn't exist
        Car car;
        if (dto.getCarName() != null && !dto.getCarName().isEmpty()) {
            car = carRepository.findByName(dto.getCarName())
                    .orElseGet(() -> {
                        // Create new car if it doesn't exist
                        Car newCar = new Car();
                        newCar.setName(dto.getCarName());
                        newCar.setImage(dto.getCarImage() != null ? dto.getCarImage() : "/default-car.jpg");
                        newCar.setLocation(dto.getCarLocation() != null ? dto.getCarLocation() : "Default Location");
                        newCar.setPrice(dto.getPrice() != null ? dto.getPrice().toString() : "0");
                        return carRepository.save(newCar);
                    });
        } else if (dto.getCarId() != null) {
            car = carRepository.findById(dto.getCarId()).orElseThrow(() -> new RuntimeException("Car not found"));
        } else {
            throw new RuntimeException("Either carName or carId must be provided");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setCar(car);
        booking.setTripType(dto.getTripType());
        booking.setPickupLocation(dto.getPickupLocation());
        booking.setPickupDateTime(dto.getPickupDateTime());
        booking.setDurationHours(dto.getDurationHours());
        booking.setPaymentMethod(dto.getPaymentMethod());
        booking.setPaymentIdentifier(dto.getPaymentIdentifier());
        
        // Set additional booking details
        booking.setTotalPrice(dto.getPrice());
        booking.setCarName(dto.getCarName());
        booking.setCarImage(dto.getCarImage());
        booking.setCarLocation(dto.getCarLocation());

        Booking saved = bookingRepository.save(booking);

        return new BookingResponseDTO(
                saved.getId(),
                saved.getUser().getId(),
                saved.getCar().getId(),
                saved.getTripType(),
                saved.getPickupLocation(),
                saved.getPickupDateTime(),
                saved.getDurationHours(),
                saved.getPaymentMethod(),
                saved.getPaymentIdentifier(),
                saved.getCarName(),
                saved.getCarImage(),
                saved.getCarLocation(),
                saved.getTotalPrice(),
                saved.getUser().getEmail()
        );
    }

    public List<BookingResponseDTO> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private BookingResponseDTO toDTO(Booking b) {
        return new BookingResponseDTO(
                b.getId(),
                b.getUser().getId(),
                b.getCar().getId(),
                b.getTripType(),
                b.getPickupLocation(),
                b.getPickupDateTime(),
                b.getDurationHours(),
                b.getPaymentMethod(),
                b.getPaymentIdentifier(),
                b.getCarName(),
                b.getCarImage(),
                b.getCarLocation(),
                b.getTotalPrice(),
                b.getUser().getEmail()
        );
    }
}
