package com.firstproject.platform.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginDTO {
    @NotBlank @Email
    public String email;

    @NotBlank
    public String password;
}
