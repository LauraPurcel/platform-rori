package com.firstproject.platform.CONTROLLER;


import com.firstproject.platform.MODEL.User;
import com.firstproject.platform.SECURITY.JwtService;
import com.firstproject.platform.SERVICE.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")

public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping("/me")
    public User getLoggedUser(@RequestHeader("Authorization") String header) {
        String token = header.replace("Bearer ", "");
        String email = jwtService.extractUsername(token);
        return userService.getByEmail(email);
    }
}
