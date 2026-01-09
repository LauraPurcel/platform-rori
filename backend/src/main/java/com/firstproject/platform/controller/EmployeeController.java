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
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired private ContractRepository contractRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(Authentication authentication) {
        String email = authentication.getName();

        Employee emp = employeeRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Profilul nu a fost găsit"));


        Optional<Contract> contract = contractRepository.findByEmployeeId(emp.getId());


        Map<String, Object> response = new HashMap<>();
        response.put("personalData", emp);
        response.put("contractData", contract.orElse(null));

        return ResponseEntity.ok(response);
    }
}