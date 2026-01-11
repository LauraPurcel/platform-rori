package com.firstproject.platform.service;

import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee getByEmail(String email) {
        return employeeRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public List<Employee> getEmployeesWithoutContract() {
        return employeeRepository.findEmployeesWithoutContract();
    }
    public List<Employee> getEmployeesWithContract() {
        return employeeRepository.findEmployeesWithContract();
    }
}
