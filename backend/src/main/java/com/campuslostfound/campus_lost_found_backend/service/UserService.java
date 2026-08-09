package com.campuslostfound.campus_lost_found_backend.service;

import com.campuslostfound.campus_lost_found_backend.dto.request.LoginRequest;
import com.campuslostfound.campus_lost_found_backend.dto.request.RegisterRequest;
import com.campuslostfound.campus_lost_found_backend.dto.response.LoginResponse;
import com.campuslostfound.campus_lost_found_backend.entity.User;

public interface UserService {

    void register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    User getUserById(Long id);
}