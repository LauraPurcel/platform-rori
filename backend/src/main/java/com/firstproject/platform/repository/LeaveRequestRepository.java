package com.firstproject.platform.repository;

import com.firstproject.platform.entity.LeaveRequest;
import com.firstproject.platform.entity.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByStatus(LeaveStatus status);

    List<LeaveRequest> findByEmployeeId(Long id);
}
