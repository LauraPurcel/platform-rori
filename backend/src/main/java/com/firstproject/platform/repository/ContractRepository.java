package com.firstproject.platform.repository;

import com.firstproject.platform.entity.Contract;
import com.firstproject.platform.entity.Employee;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
    Optional<Contract> findByEmployee(Employee employee);
    Optional<Contract> findByEmployeeId(Long employeeId);
    @Query("SELECT c FROM Contract c WHERE c.employee.user.email = :email")
    Optional<Contract> findByEmployeeEmail(@Param("email") String email);
    @Modifying
    @Transactional
    @Query("DELETE FROM Contract c WHERE c.id = :id")
    void deleteByIdDirect(Long id);
}
