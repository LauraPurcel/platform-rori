package com.firstproject.platform.controller;

import com.firstproject.platform.dto.LoginDTO;
import com.firstproject.platform.dto.RegisterDTO;
import com.firstproject.platform.dto.VerifyOtpDTO;
import com.firstproject.platform.entity.LoginResponse;
import com.firstproject.platform.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired private AuthService service;
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginDTO dto) {
        return service.login(dto);
    }
    @PostMapping("/verify-otp")
    public LoginResponse verifyOtp(@RequestBody VerifyOtpDTO dto) {
        return service.verifyOtp(dto);
    }


    @PostMapping("/register")
    public void register(@Valid @RequestBody RegisterDTO dto) {
        service.register(dto);
    }
}
