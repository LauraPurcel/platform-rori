package com.firstproject.platform.service;

import com.firstproject.platform.dto.LeaveRequestDTO;
import com.firstproject.platform.entity.*;
import com.firstproject.platform.repository.ContractRepository;
import com.firstproject.platform.repository.EmployeeRepository;
import com.firstproject.platform.repository.LeaveRequestRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class LeaveService {

    @Autowired private LeaveRequestRepository leaveRepo;
    @Autowired private EmployeeRepository empRepo;
    @Autowired private ContractRepository contractRepo;
    @Autowired private EmailService emailService;

    @Autowired
    private NotificationService notificationService;

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
        empRepo.findAll().stream()
                .filter(e -> e.getUser() != null && e.getUser().getRole() == Role.HR_MANAGER)
                .findFirst()
                .ifPresent(hr -> notificationService.notify(
                        hr,
                        "Cerere concediu nouă",
                        emp.getFirstName() + " " + emp.getLastName() + " a trimis o cerere de concediu."
                ));

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
        long daysRequested = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1;

        if (contract.getPaidLeaveDaysLeft() < daysRequested) {
            throw new RuntimeException("Angajatul nu are suficiente zile de concediu rămase!");
        }
        contract.setPaidLeaveDaysLeft(contract.getPaidLeaveDaysLeft() - (int) daysRequested);
        emailService.sendEmail(
                request.getEmployee().getUser().getEmail(),
                "Cerere concediu aprobată",
                "Salut " + request.getEmployee().getFirstName() + ",<br/><br/>" +
                        "Cererea ta pentru concediu în perioada <b>" +
                        request.getStartDate() + " -> " + request.getEndDate() +
                        "</b> a fost aprobată.<br/><br/>" +
                        "Motiv: " + (request.getReason() != null ? request.getReason() : "N/A") +
                        "<br/><br/>Echipa HR"
        );
        contractRepo.save(contract);
        leaveRepo.save(request);

    }
    public void reject(Long id) {
        LeaveRequest request = leaveRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cererea nu există"));
        request.setStatus(LeaveStatus.REJECTED);
        emailService.sendEmail(
                request.getEmployee().getUser().getEmail(),
                "Cerere concediu respinsă",
                "Salut " + request.getEmployee().getFirstName() + ",<br/><br/>" +
                        "Cererea ta pentru concediu în perioada <b>" +
                        request.getStartDate() + " -> " + request.getEndDate() +
                        "</b> a fost respinsă.<br/><br/>" +
                        "Motiv: " + (request.getReason() != null ? request.getReason() : "N/A") +
                        "<br/><br/>Echipa HR"
        );
        leaveRepo.save(request);
    }
    public int getRemainingLeaveDays(String email) {

        Employee emp = empRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Angajatul nu a fost găsit"));

        Contract contract = contractRepo.findByEmployeeId(emp.getId())
                .orElseThrow(() -> new RuntimeException("Angajatul nu are contract"));

        return contract.getPaidLeaveDaysLeft();
    }

}