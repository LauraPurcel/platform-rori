package com.firstproject.platform.controller;

import com.firstproject.platform.dto.CreateContractDTO;
import com.firstproject.platform.dto.HrStatsDTO;
import com.firstproject.platform.entity.*;
import com.firstproject.platform.repository.ContractRepository;
import com.firstproject.platform.repository.DeskRequestRepository;
import com.firstproject.platform.repository.EmployeeRepository;
import com.firstproject.platform.repository.LeaveRequestRepository;
import com.firstproject.platform.service.ContractService;
import com.firstproject.platform.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/hr")
@PreAuthorize("hasRole('HR_MANAGER')")
public class HRController {

    @Autowired private ContractService contractService;
    @Autowired private LeaveService leaveService;
    @Autowired private LeaveRequestRepository leaveRequestRepository;

    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private ContractRepository contractRepository;
    @Autowired private DeskRequestRepository deskRequestRepository;

    @PostMapping("/contract")
    public void createContract(@RequestBody CreateContractDTO dto) {
        contractService.createContract(dto);
    }

    @PutMapping("/contract/{id}")
    public void updateContract(@PathVariable Long id, @RequestBody CreateContractDTO dto) {
        contractService.updateContract(id, dto);
    }

    @DeleteMapping("/contract/{id}")
    public void deleteContract(@PathVariable Long id) {
        contractService.deleteContract(id);
    }

    // Endpoint pentru a vedea toate contractele existente
    @GetMapping("/contracts")
    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    @GetMapping("/leaves/pending")
    public List<LeaveRequest> getPendingLeaves() {
        return leaveRequestRepository.findByStatus(LeaveStatus.PENDING);
    }

    @GetMapping("/uncontracted-employees")
    public List<Employee> getEmployeesWithoutContract() {
        return employeeRepository.findAll().stream()
                .filter(e -> contractRepository.findByEmployeeId(e.getId()).isEmpty())
                .collect(Collectors.toList());
    }

    @PostMapping("/leave/{id}/approve")
    public void approveLeave(@PathVariable Long id) {
        leaveService.approve(id);
    }
    @PostMapping("/leave/{id}/reject")
    public void rejectLeave(@PathVariable Long id) {
        leaveService.reject(id);
    }

    @GetMapping("/calendar/events")
    public ResponseEntity<?> getCalendarEvents() {
        List<LeaveRequest> leaves = leaveRequestRepository.findByStatus(LeaveStatus.APPROVED);

        List<DeskRequest> desks = deskRequestRepository.findAll();

        Map<String, Object> response = new HashMap<>();
        response.put("leaves", leaves);
        response.put("desks", desks);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public HrStatsDTO getStats() {

        long totalEmployees = employeeRepository.count();

        long activeContracts = contractRepository.count();


        long uncontracted = employeeRepository.findAll().stream()
                .filter(e -> contractRepository.findByEmployeeId(e.getId()).isEmpty())
                .count();

        long pendingLeaves = leaveRequestRepository.countByStatus(LeaveStatus.PENDING);

        return new HrStatsDTO(
                totalEmployees,
                activeContracts,
                uncontracted,
                pendingLeaves
        );
    }

}