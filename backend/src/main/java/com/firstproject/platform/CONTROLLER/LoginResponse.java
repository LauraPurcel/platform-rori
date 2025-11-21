package com.firstproject.platform.CONTROLLER;



import com.firstproject.platform.MODEL.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data

public class LoginResponse {
    private User user;
    private String token;
    public LoginResponse(){}
    public LoginResponse(User user, String token) {
        this.user = user;
        this.token = token;
    }
}