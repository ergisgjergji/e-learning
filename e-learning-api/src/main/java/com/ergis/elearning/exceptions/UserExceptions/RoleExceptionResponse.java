package com.ergis.elearning.exceptions.UserExceptions;

public class RoleExceptionResponse {

    private String role;

    public RoleExceptionResponse(String role) {
        this.role = role;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
