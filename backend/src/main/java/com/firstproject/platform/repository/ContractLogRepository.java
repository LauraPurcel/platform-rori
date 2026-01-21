package com.firstproject.platform.repository;

import com.firstproject.platform.entity.ContractLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ContractLogRepository extends JpaRepository<ContractLog, Long> {
    List<ContractLog> findAllByOrderByTimestampDesc();
    List<ContractLog> findAllByEmployeeIdOrderByTimestampDesc(Long employeeId);

}
