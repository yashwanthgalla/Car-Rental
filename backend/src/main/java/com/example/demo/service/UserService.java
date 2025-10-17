package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Check if a user already exists by email
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // Encode raw password
    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    // Save user, ensure default ROLE_USER if roles are empty
    public void saveUser(User user) {
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            Set<String> defaultRoles = new HashSet<>();
            defaultRoles.add("ROLE_USER");
            user.setRoles(defaultRoles);
        }
        userRepository.save(user);
    }

    // Validate user login credentials and role
    public boolean validateUser(String email, String rawPassword, String role) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) return false;

        User user = optionalUser.get();

        // Check role
        if (!user.getRoles().contains(role)) return false;

        // Check password
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    // Get user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
