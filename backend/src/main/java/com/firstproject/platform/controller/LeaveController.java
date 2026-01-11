package com.firstproject.platform.controller;

import com.firstproject.platform.dto.LeaveRequestDTO;
import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.LeaveRequest;
import com.firstproject.platform.repository.EmployeeRepository;
import com.firstproject.platform.repository.LeaveRequestRepository;
import com.firstproject.platform.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leave")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;
    @Autowired private LeaveRequestRepository leaveRepo;
    @Autowired private EmployeeRepository empRepo;

    @PostMapping("/request")
    public void requestLeave(@RequestBody LeaveRequestDTO dto, Authentication auth) {
        leaveService.createRequest(dto, auth.getName());
    }

    @GetMapping("/my-requests")
    public List<LeaveRequest> getMyRequests(Authentication auth) {
        Employee emp = empRepo.findByUserEmail(auth.getName()).orElseThrow();
        return leaveRepo.findByEmployeeId(emp.getId());
    }
    @GetMapping("/balance")
    public Map<String, Integer> getBalance(@AuthenticationPrincipal UserDetails user) {
        int remaining = leaveService.getRemainingLeaveDays(user.getUsername());
        return Map.of("remainingDays", remaining);
    }

}