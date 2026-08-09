package com.campuslostfound.campus_lost_found_backend.controller.auth;

import com.campuslostfound.campus_lost_found_backend.dto.request.RegisterRequest;
import com.campuslostfound.campus_lost_found_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.campuslostfound.campus_lost_found_backend.dto.request.LoginRequest;
import com.campuslostfound.campus_lost_found_backend.dto.response.LoginResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {

        userService.register(request);

        return "User registered successfully";
    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        return userService.login(request);
    }
}