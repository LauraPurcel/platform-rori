package com.firstproject.platform.repository;

import com.firstproject.platform.entity.DeskRequest;
import com.firstproject.platform.entity.DeskStatus;
import com.firstproject.platform.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface DeskRequestRepository extends JpaRepository<DeskRequest, Long> {
    long countByDateAndStatus(LocalDate date, DeskStatus status);

    long countByDate(LocalDate date);

    boolean existsByEmployeeAndDate(Employee emp, LocalDate date);
}
