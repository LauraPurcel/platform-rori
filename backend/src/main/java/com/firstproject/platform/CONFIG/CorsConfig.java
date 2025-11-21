package com.firstproject.platform.CONFIG;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configurația CORS (Cross-Origin Resource Sharing) pentru a permite
 * front-end-ului Next.js (port 3000) să acceseze API-ul (port 8080).
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica regulile CORS tuturor endpoint-urilor
                .allowedOrigins("http://localhost:3000") // Permite doar originea front-end-ului Next.js
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Metodele HTTP permise
                .allowedHeaders("*") // Permite toate headerele (inclusiv Authorization)
                .allowCredentials(true); // Permite trimiterea de cookie-uri/acreditări (dacă este cazul)
    }
}