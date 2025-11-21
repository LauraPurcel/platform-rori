package com.firstproject.platform.SECURITY;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    // Adăugați aici o referință către filtrul JWT, de care veți avea nevoie
    // pentru a proteja rutele.
    // Presupunând că veți crea clasa JwtAuthenticationFilter
    // private final JwtAuthenticationFilter jwtAuthFilter; // Păstrați-o comentată până la implementare

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // --- Configurare pentru Spring Security 6.x (Lambda DSL) ---
        http
                // 1. Dezactivarea CSRF (esential pentru REST APIs care folosesc JWT)
                .csrf(csrf -> csrf.disable())

                // 2. Definirea regulilor de autorizare a cererilor (Authorization Rules)
                .authorizeHttpRequests(auth -> auth
                        // Permite accesul anonim la rutele de autentificare
                        .requestMatchers("/api/auth/**").permitAll()
                        // Toate celelalte cereri necesită autentificare (token valid)
                        .anyRequest().authenticated()
                )

                // 3. Setarea politicii de sesiune ca STATELESS (fără sesiune de server)
                // Aceasta este esențială atunci când se folosesc JWT-uri.
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // 4. (PAS NECESAR, DAR LIPSEȘTE ÎN ARHITECTURA INIȚIALĂ)
        // Adăugarea filtrului JWT *înainte* de filtrul standard de verificare a parolei/utilizatorului
        // http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt este standardul industriei pentru hashing-ul parolelor
        return new BCryptPasswordEncoder();
    }
}