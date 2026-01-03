package com.firstproject.platform.controller;

import com.firstproject.platform.dto.LoginDTO;
import com.firstproject.platform.dto.RegisterDTO;
import com.firstproject.platform.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired private AuthService service;

    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginDTO dto) {
        return service.login(dto);
    }
    @PostMapping("/register")
    public void register(@Valid @RequestBody RegisterDTO dto) {
        service.register(dto);
    }
}
