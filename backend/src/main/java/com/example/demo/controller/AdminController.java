package com.example.demo.controller;

import com.example.demo.dto.BookingResponseDTO;
import com.example.demo.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final BookingService bookingService;

    public AdminController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/dashboard")
    public String adminDashboard() {
        return "Welcome Admin! You can manage cars and users.";
    }

    // Get all bookings
    @GetMapping("/bookings")
    public List<BookingResponseDTO> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Get bookings of a specific user
    @GetMapping("/bookings/user/{userId}")
    public List<BookingResponseDTO> getBookingsByUser(@PathVariable Long userId) {
        return bookingService.getBookingsByUser(userId);
    }
}
