package com.firstproject.platform.SECURITY;

import com.firstproject.platform.MODEL.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    // IMPORTANT: Această cheie trebuie să fie mai lungă de 32 de caractere și stocată în siguranță!
    private final String SECRET_KEY = "1234567890123456789012345678901234567890";

    // Modificat pentru a primi obiectul User
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail()) // Folosim email-ul ca subiect (username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) // 24h
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .compact();
    }

    // Redenumit din extractEmail în extractUsername pentru a se potrivi cu UserController
    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            extractUsername(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}