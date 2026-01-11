package com.firstproject.platform.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {

    public String generateOtp() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }

    public boolean isExpired(LocalDateTime expiration) {
        return expiration.isBefore(LocalDateTime.now());
    }
}
