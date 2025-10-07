package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ================== SIGNUP ==================
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (userService.existsByEmail(email)) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email already registered");
            return ResponseEntity.badRequest().body(error);
        }

        User user = new User();
        user.setEmail(email);
        user.setFullName(body.get("fullName"));
        user.setPhone(body.get("phone"));
        user.setPassword(userService.encodePassword(body.get("password")));

        // Assign ROLE_USER automatically
        user.setRoles(Set.of("ROLE_USER"));

        userService.saveUser(user);

        Map<String, String> response = new HashMap<>();
        response.put("email", email);
        response.put("role", "ROLE_USER");
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }

    // ================== LOGIN ==================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String role = body.get("role"); // "ROLE_USER" or "ROLE_ADMIN"

        boolean valid = userService.validateUser(email, password, role);
        if (valid) {
            Map<String, String> response = new HashMap<>();
            response.put("email", email);
            response.put("role", role);
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid credentials or role");
            return ResponseEntity.status(401).body(error);
        }
    }

    // ================== GET USER BY EMAIL ==================
    @GetMapping("/user")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("email", user.getEmail());
            response.put("fullName", user.getFullName());
            response.put("phone", user.getPhone());
            response.put("roles", user.getRoles());
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("message", "User not found");
            return ResponseEntity.status(404).body(error);
        }
    }
}
