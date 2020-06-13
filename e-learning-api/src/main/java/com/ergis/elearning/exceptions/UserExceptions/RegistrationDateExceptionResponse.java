package com.ergis.elearning.exceptions.UserExceptions;

public class RegistrationDateExceptionResponse {

    private String registration_date;

    public RegistrationDateExceptionResponse(String registration_date) {
        this.registration_date = registration_date;
    }

    public String getRegistration_date() {
        return this.registration_date;
    }

    public void setRegistration_date(String registration_date) {
        this.registration_date = registration_date;
    }
}
