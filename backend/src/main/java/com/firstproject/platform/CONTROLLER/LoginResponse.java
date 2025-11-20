package com.firstproject.platform.CONTROLLER;



import com.firstproject.platform.MODEL.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private User user;
    private String token;
}