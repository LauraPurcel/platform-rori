package com.firstproject.platform.controller;

import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.Notification;
import com.firstproject.platform.repository.EmployeeRepository;
import com.firstproject.platform.repository.NotificationRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepo;
    private final EmployeeRepository empRepo;

    public NotificationController(NotificationRepository notificationRepo,
                                  EmployeeRepository empRepo) {
        this.notificationRepo = notificationRepo;
        this.empRepo = empRepo;
    }

    @GetMapping
    public List<Notification> getMyNotifications(
            @AuthenticationPrincipal UserDetails user
    ) {
        Employee emp = empRepo.findByUserEmail(user.getUsername())
                .orElseThrow();

        return notificationRepo.findByRecipientAndReadFalse(emp);
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {
        Notification n = notificationRepo.findById(id)
                .orElseThrow();
        n.setRead(true);
        notificationRepo.save(n);
    }
}
