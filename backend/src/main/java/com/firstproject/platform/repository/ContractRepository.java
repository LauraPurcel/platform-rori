package com.firstproject.platform.repository;

import com.firstproject.platform.entity.Contract;
import com.firstproject.platform.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
    Optional<Contract> findByEmployee(Employee employee);
    Optional<Contract> findByEmployeeId(Long employeeId);
    //Optional<Employee> findByCnp(String cnp);

    //@Query("SELECT e FROM Employee e WHERE e.contract IS NULL")
    //List<Employee> findEmployeesWithoutContract();
}
