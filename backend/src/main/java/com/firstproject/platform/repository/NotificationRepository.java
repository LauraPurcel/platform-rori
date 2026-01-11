package com.firstproject.platform.repository;

import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByRecipientAndReadFalse(Employee recipient);

    List<Notification> findByRecipient(Employee recipient);
}
