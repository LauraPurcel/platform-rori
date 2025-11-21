package com.firstproject.platform.MODEL;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String CNP;
    private LocalDate dateOfBirth;
    private String phone;
    private String email;
    private String address;
    private String passwordHash;
    private LocalDate hireDate;
    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public String getEmail() {
        return email;
    }

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
}
