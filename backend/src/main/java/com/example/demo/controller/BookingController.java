package com.example.demo.controller;

import com.example.demo.dto.BookingRequestDTO;
import com.example.demo.dto.BookingResponseDTO;
import com.example.demo.entity.User;
import com.example.demo.service.BookingService;
import com.example.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final UserService userService;

    public BookingController(BookingService bookingService, UserService userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }

    // ================== CREATE BOOKING ==================
    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequestDTO dto) {
        if (dto.getEmail() == null || dto.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required to create a booking.");
        }

        // Fetch user by email
        User user = userService.getUserByEmail(dto.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found for email: " + dto.getEmail());
        }

        // Set the actual userId in the DTO
        dto.setUserId(user.getId());

        try {
            BookingResponseDTO response = bookingService.createBooking(dto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Booking creation failed: " + e.getMessage());
        }
    }

    // ================== GET BOOKINGS BY USER ==================
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponseDTO>> getBookingsByUser(@PathVariable Long userId) {
        List<BookingResponseDTO> bookings = bookingService.getBookingsByUser(userId);
        if (bookings.isEmpty()) {
            return ResponseEntity.ok().body(List.of());
        }
        return ResponseEntity.ok(bookings);
    }

    // ================== GET ALL BOOKINGS ==================
    @GetMapping("/all")
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
}
