package com.firstproject.platform.controller;

import com.firstproject.platform.entity.Contract;
import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.repository.ContractRepository;
import com.firstproject.platform.repository.EmployeeRepository;
import com.firstproject.platform.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final ContractRepository contractRepository;

    public EmployeeController(EmployeeService employeeService,
                              ContractRepository contractRepository) {
        this.employeeService = employeeService;
        this.contractRepository = contractRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(Authentication authentication) {

        String email = authentication.getName();
        Employee emp = employeeService.getByEmail(email);

        var contract = contractRepository.findByEmployeeId(emp.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("personalData", emp);
        response.put("contractData", contract.orElse(null));

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/eligible")
    public List<Employee> getEligibleEmployees() {
        return employeeService.getEmployeesWithContract();
    }
    
}
