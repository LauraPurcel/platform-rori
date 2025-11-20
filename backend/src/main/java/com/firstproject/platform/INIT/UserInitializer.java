package com.firstproject.platform.INIT;

import com.firstproject.platform.MODEL.User;
import com.firstproject.platform.SERVICE.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component

public class UserInitializer implements CommandLineRunner {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserInitializer(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Defineste parola in text clar
        String rawPassword = "parola";

        // Cripteaza parola
        String hashedPassword = passwordEncoder.encode(rawPassword);

        // Creeaza utilizatorul de test cu parola criptata
        User testUser = new User(
                "Test",
                "User",
                "test@example.com", // EMAIL-ul de utilizat pentru login
                hashedPassword
        );

        userService.save(testUser);

        System.out.println("-----------------------------------------------------------------");
        System.out.println("!!! UN UTILIZATOR DE TEST A FOST INSERAT IN BAZA DE DATE !!!");
        System.out.println("  Email: test@example.com");
        System.out.println("  Parola: parola");
        System.out.println("-----------------------------------------------------------------");
    }
}