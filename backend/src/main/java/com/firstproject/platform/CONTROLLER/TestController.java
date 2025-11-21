package com.firstproject.platform.CONTROLLER;

import com.firstproject.platform.MODEL.User;
import com.firstproject.platform.SERVICE.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final UserService userService;

    public TestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/db-connection")
    public ResponseEntity<?> testDbConnection() {

        String testEmail = "roxandOlaru7@gmail.com";
        try {
            User user = userService.getByEmail(testEmail);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body("Eroare: Conexiunea la baza de date sau utilizatorul de test nu a putut fi găsit. Detalii: " + e.getMessage());
        }
    }
}