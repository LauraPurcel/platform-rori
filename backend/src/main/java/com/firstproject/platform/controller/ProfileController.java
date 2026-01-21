package com.firstproject.platform.controller;

import com.firstproject.platform.dto.ContractLogViewDTO;
import com.firstproject.platform.dto.EmployeeSalaryDTO;
import com.firstproject.platform.entity.Contract;
import com.firstproject.platform.entity.ContractLog;
import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.repository.ContractLogRepository;
import com.firstproject.platform.repository.ContractRepository;
import com.firstproject.platform.repository.EmployeeRepository;
import com.firstproject.platform.service.ContractLogService;
import com.firstproject.platform.service.EmployeeService;
import com.firstproject.platform.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private ContractLogRepository logRepo;
    @Autowired private ContractRepository contractRepository;
    @Autowired private ContractLogService contractLogService;


    @Autowired private SalaryService salaryService;

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

    @GetMapping("/me/salary")
    public EmployeeSalaryDTO getMySalary(@AuthenticationPrincipal UserDetails user) {
        Contract c = contractRepository.findByEmployeeEmail(user.getUsername())
                .orElseThrow(() -> new RuntimeException("Contract missing"));

        EmployeeSalaryDTO dto = new EmployeeSalaryDTO();
        dto.grossSalary = salaryService.calculateSalary(c, "gross");
        dto.netSalary = salaryService.calculateSalary(c, "net");
        dto.casContribution = dto.grossSalary * 0.25;
        dto.cnasContribution = dto.grossSalary * 0.10;
        dto.tax = dto.grossSalary * 0.10;
        dto.jobTitle = c.getJobTitle();
        dto.workingHours = c.getWorkingHours();
        dto.paidLeaveDaysLeft = c.getPaidLeaveDaysLeft();
        return dto;
    }
    @GetMapping("/me/contract-logs")
    public List<ContractLogViewDTO> getMyContractLogs(@AuthenticationPrincipal UserDetails user) {
        Employee emp = employeeRepository.findByUserEmail(user.getUsername())
                .orElseThrow(() -> new RuntimeException("Angajat inexistent"));
        return contractLogService.getLogsForEmployee(emp.getId());
    }
}