package com.ergis.elearning.exceptions.UserExceptions;

public class FacultyExceptionResponse {

    private String faculty;

    public FacultyExceptionResponse(String faculty) {
        this.faculty = faculty;
    }

    public String getFaculty() {
        return this.faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }
}
