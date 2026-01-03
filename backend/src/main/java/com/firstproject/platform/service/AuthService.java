package com.firstproject.platform.service;

import com.firstproject.platform.dto.LoginDTO;
import com.firstproject.platform.dto.RegisterDTO;
import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.Role;
import com.firstproject.platform.entity.User;
import com.firstproject.platform.repository.EmployeeRepository;
import com.firstproject.platform.repository.UserRepository;
import com.firstproject.platform.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired private UserRepository userRepo;
    @Autowired private EmployeeRepository employeeRepo;
    @Autowired private PasswordEncoder encoder;
    @Autowired private JwtUtil jwtUtil;

    public String login(LoginDTO dto) {
        User user = userRepo.findByEmail(dto.email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(dto.password, user.getPassword()))
            throw new RuntimeException("Invalid credentials");

        return jwtUtil.generateToken(user);
    }

    public void register(RegisterDTO dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(encoder.encode(dto.getPassword()));
        user.setRole(Role.EMPLOYEE);

        userRepo.save(user);
        Employee emp = new Employee();
        emp.setCnp(dto.getCnp());
        emp.setFirstName(dto.getFirstName());
        emp.setLastName(dto.getLastName());
        emp.setUser(user);

        employeeRepo.save(emp);
    }
}
