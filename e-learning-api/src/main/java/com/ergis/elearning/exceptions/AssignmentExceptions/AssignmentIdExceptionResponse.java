package com.ergis.elearning.exceptions.AssignmentExceptions;

public class AssignmentIdExceptionResponse {

    private String id;

    public AssignmentIdExceptionResponse(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
