package com.firstproject.platform.CONTROLLER;

import com.firstproject.platform.MODEL.User;
import com.firstproject.platform.SECURITY.JwtService;
import com.firstproject.platform.SERVICE.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        User user = userService.getByEmail(req.getEmail());

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // Generează token-ul folosind obiectul User
        String token = jwtService.generateToken(user);

        // Returnează un obiect structurat cu User și Token
        return ResponseEntity.ok(new LoginResponse(user, token));
    }
}