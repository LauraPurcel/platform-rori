package com.firstproject.platform.controller;

import com.firstproject.platform.entity.Contract;
import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.repository.ContractRepository;
import com.firstproject.platform.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private ContractRepository contractRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(Authentication authentication) {
        // authentication.getName() returnează email-ul utilizatorului extras din JWT
        String email = authentication.getName();

        Employee emp = employeeRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Angajatul nu a fost găsit"));

        Contract contract = contractRepository.findByEmployeeId(emp.getId()).orElse(null);

        Map<String, Object> response = new HashMap<>();
        response.put("employee", emp);
        response.put("contract", contract);

        return ResponseEntity.ok(response);
    }
}