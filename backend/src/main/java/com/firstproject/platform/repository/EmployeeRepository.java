package com.firstproject.platform.repository;

import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.Role;
import com.firstproject.platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByCnp(String cnp);
    Optional<Employee> findByUserEmail(String email);
    @Query("SELECT e FROM Employee e WHERE e.contract IS NULL")
    List<Employee> findEmployeesWithoutContract();
    Optional<Employee> findByUser(User user);
    @Query("SELECT e FROM Employee e WHERE e.contract IS NOT NULL AND e.user.role = 'EMPLOYEE'")
    List<Employee> findEmployeesWithContract();
    Optional<Employee> findByRole(Role role);
}
