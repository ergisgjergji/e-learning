package com.ergis.elearning.exceptions.UserExceptions;

public class PasswordExceptionResponse {

    private String password;

    public PasswordExceptionResponse(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

