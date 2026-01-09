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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


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

        Role role;
        try {
            role = Role.valueOf(dto.getRole());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role");
        }

        if (role == Role.HR_MANAGER) {
            throw new RuntimeException("HR_MANAGER cannot be registered");
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(encoder.encode(dto.getPassword()));
        user.setRole(role);

        userRepo.save(user);

        Employee emp = new Employee();
        emp.setCnp(dto.getCnp());
        emp.setFirstName(dto.getFirstName());
        emp.setLastName(dto.getLastName());
        emp.setUser(user);
        emp.setPhone(dto.getPhone());
        emp.setAddress(dto.getAddress());

        employeeRepo.save(emp);
    }

    
    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName(); // din JWT
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    public Employee getCurrentEmployee() {
        User user = getCurrentUser();

        return employeeRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }


}
