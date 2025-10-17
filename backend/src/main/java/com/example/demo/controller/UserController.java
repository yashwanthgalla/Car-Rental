package com.example.demo.controller;

import com.example.demo.dto.BookingResponseDTO;
import com.example.demo.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final BookingService bookingService;

    public UserController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    public List<BookingResponseDTO> getMyBookings(@RequestParam Long userId) {
        return bookingService.getBookingsByUser(userId);
    }
}
