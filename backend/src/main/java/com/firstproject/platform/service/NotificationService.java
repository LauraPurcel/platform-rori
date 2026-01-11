package com.firstproject.platform.service;

import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.Notification;
import com.firstproject.platform.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepo;

    public void notify(Employee recipient, String title, String message) {
        Notification n = new Notification();
        n.setRecipient(recipient);
        n.setTitle(title);
        n.setMessage(message);
        n.setRead(false);
        n.setCreatedAt(LocalDateTime.now());

        notificationRepo.save(n);
    }
}
