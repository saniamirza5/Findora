package com.campuslostfound.campus_lost_found_backend.service.impl;

import com.campuslostfound.campus_lost_found_backend.dto.request.RegisterRequest;
import com.campuslostfound.campus_lost_found_backend.repository.UserRepository;
import com.campuslostfound.campus_lost_found_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.campuslostfound.campus_lost_found_backend.entity.User;
import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.campuslostfound.campus_lost_found_backend.dto.request.LoginRequest;
import com.campuslostfound.campus_lost_found_backend.dto.response.LoginResponse;
import com.campuslostfound.campus_lost_found_backend.util.JwtUtil;




@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;



    @Override
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .createdAt(LocalDateTime.now())
                .build();
        userRepository.save(user);
    }
    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
    @Override
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }
}