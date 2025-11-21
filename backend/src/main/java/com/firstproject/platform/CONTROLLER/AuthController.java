package com.firstproject.platform.CONTROLLER;

import com.firstproject.platform.MODEL.User;
import com.firstproject.platform.SECURITY.JwtService;
import com.firstproject.platform.SERVICE.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        User user = userService.getByEmail(req.getEmail());

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }


        String token = jwtService.generateToken(user);


        return ResponseEntity.ok(new LoginResponse(user, token));
    }
    @GetMapping("/hash-test/{parola}")
    public String generateHashTest(@PathVariable String parola) {
        return passwordEncoder.encode(parola);
    }
}