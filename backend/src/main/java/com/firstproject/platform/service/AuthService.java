package com.firstproject.platform.service;

import com.firstproject.platform.dto.LoginDTO;
import com.firstproject.platform.dto.RegisterDTO;
import com.firstproject.platform.dto.VerifyOtpDTO;
import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.LoginResponse;
import com.firstproject.platform.entity.Role;
import com.firstproject.platform.entity.User;
import com.firstproject.platform.repository.EmployeeRepository;
import com.firstproject.platform.repository.UserRepository;
import com.firstproject.platform.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;


@Service
public class AuthService {

    @Autowired private UserRepository userRepo;
    @Autowired private EmployeeRepository employeeRepo;
    @Autowired private PasswordEncoder encoder;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private OtpService otpService;
    @Autowired private EmailService emailService;


    public LoginResponse login(LoginDTO dto) {
        User user = userRepo.findByEmail(dto.email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(dto.password, user.getPassword()))
            throw new RuntimeException("Invalid credentials");

        LoginResponse response = new LoginResponse();

        if (user.getRole() == Role.HR_MANAGER) {
            String otp = otpService.generateOtp();

            response.setRequires2FA(true);
            response.setToken(null);

            response.setRequires2FA(true);
            user.setOtpCode(otp);
            user.setOtpExpiration(LocalDateTime.now().plusMinutes(5));
            userRepo.save(user);

            System.out.println("OTP trimis la "  + ": " + otp + " mesaj din email service");
            emailService.sendOtp(user.getEmail(), otp);

            return response;
        }

        response.setRequires2FA(false);
        response.setToken(jwtUtil.generateToken(user));
        return response;
    }

    public LoginResponse verifyOtp(VerifyOtpDTO dto) {
        User user = userRepo.findByEmail(dto.email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));


        if (user.getOtpCode() == null || user.getOtpExpiration() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP not requested");
        }

        if (!user.getOtpCode().equals(dto.otp)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid OTP");
        }

        if (user.getOtpExpiration().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP expired");
        }

        user.setOtpCode(null);
        user.setOtpExpiration(null);
        userRepo.save(user);

        return new LoginResponse(false, jwtUtil.generateToken(user));
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

        String email = auth.getName();
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    public Employee getCurrentEmployee() {
        User user = getCurrentUser();

        return employeeRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }


}
