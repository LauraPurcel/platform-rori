package com.firstproject.platform.security;

import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.Role;
import com.firstproject.platform.entity.User;
import com.firstproject.platform.repository.EmployeeRepository;
import com.firstproject.platform.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;
@Component
public class DataInitializer {

    @Autowired
    private UserRepository repo;
    @Autowired private PasswordEncoder encoder;
    @Autowired
    EmployeeRepository repoEmployee;

    @PostConstruct
    public void init() {
        if (!repo.existsByEmail("hr@company.com")) {
            User hr = new User();
            hr.setEmail("hr@company.com");
            hr.setPassword(encoder.encode("Admin123!"));
            hr.setRole(Role.HR_MANAGER);
            repo.save(hr);

            Employee hrEmp = new Employee();
            hrEmp.setFirstName("Admin");
            hrEmp.setLastName("HR");
            hrEmp.setCnp("0000000000000"); // Un CNP fictiv pentru admin
            hrEmp.setUser(hr);
            repoEmployee.save(hrEmp);
        }

    }
}
