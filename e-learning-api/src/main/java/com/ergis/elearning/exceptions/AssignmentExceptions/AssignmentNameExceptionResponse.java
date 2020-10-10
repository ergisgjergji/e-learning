package com.ergis.elearning.exceptions.AssignmentExceptions;

public class AssignmentNameExceptionResponse {

    private String name;

    public AssignmentNameExceptionResponse(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
