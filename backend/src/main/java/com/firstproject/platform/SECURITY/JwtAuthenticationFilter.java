package com.firstproject.platform.SECURITY;

import com.firstproject.platform.MODEL.User;
import com.firstproject.platform.SERVICE.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserService userService;

    public JwtAuthenticationFilter(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Extrage Header-ul de Autorizare
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // Dacă nu există token, trece la următorul filtru
            filterChain.doFilter(request, response);
            return;
        }

        // Extrage JWT-ul (excluzând "Bearer ")
        jwt = authHeader.substring(7);

        try {
            // 2. Extrage email-ul din token
            userEmail = jwtService.extractUsername(jwt);
        } catch (Exception e) {
            // Dacă token-ul este invalid sau expirat, nu autentificăm
            System.err.println("JWT Validation Failed: " + e.getMessage());
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Verifică dacă token-ul este valid și utilizatorul NU este deja autentificat
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Folosim UserService.getByEmail pentru a prelua detaliile utilizatorului
            User user = userService.getByEmail(userEmail);

            if (jwtService.isTokenValid(jwt)) {

               UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        null,
                        Collections.emptyList()
                );


                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 5. Actualizează contextul de securitate
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}