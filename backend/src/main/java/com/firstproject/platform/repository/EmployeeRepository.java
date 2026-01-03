package com.firstproject.platform.repository;

import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByCnp(String cnp);
    Optional<Employee> findByUserEmail(String email);
}
