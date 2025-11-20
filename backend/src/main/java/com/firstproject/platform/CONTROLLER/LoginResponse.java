package com.firstproject.platform.CONTROLLER;



import com.firstproject.platform.MODEL.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data

public class LoginResponse {
    public LoginResponse() {

    }
    public LoginResponse(User user, String token) {
        this.user = user;
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    private User user;
    private String token;
}