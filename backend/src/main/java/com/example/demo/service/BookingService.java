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
        Car car = carRepository.findById(dto.getCarId()).orElseThrow(() -> new RuntimeException("Car not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setCar(car);
        booking.setTripType(dto.getTripType());
        booking.setPickupLocation(dto.getPickupLocation());
        booking.setPickupDateTime(dto.getPickupDateTime());
        booking.setDurationHours(dto.getDurationHours());
        booking.setPaymentMethod(dto.getPaymentMethod());
        booking.setPaymentIdentifier(dto.getPaymentIdentifier());

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
                saved.getPaymentIdentifier()
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
                b.getPaymentIdentifier()
        );
    }
}
