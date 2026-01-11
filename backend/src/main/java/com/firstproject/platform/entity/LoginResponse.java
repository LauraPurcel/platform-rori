package com.firstproject.platform.entity;

public class LoginResponse {

    private boolean requires2FA;
    private String token;

    public LoginResponse() {}

    public LoginResponse(boolean requires2FA, String token) {
        this.requires2FA = requires2FA;
        this.token = token;
    }

    public boolean isRequires2FA() {
        return requires2FA;
    }

    public void setRequires2FA(boolean requires2FA) {
        this.requires2FA = requires2FA;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
