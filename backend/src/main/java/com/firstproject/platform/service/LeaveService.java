package com.firstproject.platform.service;

import com.firstproject.platform.dto.LeaveRequestDTO;
import com.firstproject.platform.entity.Contract;
import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.LeaveRequest;
import com.firstproject.platform.entity.LeaveStatus;
import com.firstproject.platform.repository.ContractRepository;
import com.firstproject.platform.repository.EmployeeRepository;
import com.firstproject.platform.repository.LeaveRequestRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;

@Service
public class LeaveService {

    @Autowired private LeaveRequestRepository leaveRepo;
    @Autowired private EmployeeRepository empRepo;
    @Autowired private ContractRepository contractRepo;

    public void createRequest(LeaveRequestDTO dto, String email) {
        Employee emp = empRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Angajatul nu a fost găsit"));

        LeaveRequest request = new LeaveRequest();
        request.setEmployee(emp);
        request.setStartDate(dto.getStartDate());
        request.setEndDate(dto.getEndDate());
        request.setPaid(true);
        request.setReason(dto.getReason());
        request.setStatus(LeaveStatus.PENDING);

        leaveRepo.save(request);
    }

    @Transactional
    public void approve(Long id) {
        LeaveRequest request = leaveRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cererea nu există"));

        if (request.getStatus() != LeaveStatus.PENDING) {
            throw new RuntimeException("Doar cererile în așteptare pot fi aprobate.");
        }

        request.setStatus(LeaveStatus.APPROVED);

        Contract contract = contractRepo.findByEmployeeId(request.getEmployee().getId())
                .orElseThrow(() -> new RuntimeException("Angajatul nu are un contract activ"));

        // Calculăm numărul de zile de concediu solicitate
        long daysRequested = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1;

        // Verificăm dacă mai are suficiente zile
        if (contract.getPaidLeaveDaysLeft() < daysRequested) {
            throw new RuntimeException("Angajatul nu are suficiente zile de concediu rămase!");
        }

        // Scădem zilele din contract
        contract.setPaidLeaveDaysLeft(contract.getPaidLeaveDaysLeft() - (int) daysRequested);

        contractRepo.save(contract);
        leaveRepo.save(request);
    }
    public void reject(Long id) {
        LeaveRequest request = leaveRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cererea nu există"));
        request.setStatus(LeaveStatus.REJECTED);
        leaveRepo.save(request);
    }
}