package com.firstproject.platform.controller;

import com.firstproject.platform.service.DeskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/office")
public class DeskController {

    @Autowired
    private DeskService deskService;

    @PostMapping("/reserve")
    public ResponseEntity<?> reserveDesk(@RequestBody Map<String, String> payload, Authentication auth) {
        try {
            LocalDate date = LocalDate.parse(payload.get("date"));
            deskService.reserve(date, auth.getName());
            return ResponseEntity.ok(Map.of("message", "Loc rezervat cu succes!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}