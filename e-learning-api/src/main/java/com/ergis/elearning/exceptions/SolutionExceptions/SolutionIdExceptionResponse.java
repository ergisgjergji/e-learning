package com.ergis.elearning.exceptions.SolutionExceptions;

public class SolutionIdExceptionResponse {

    private String id;

    public SolutionIdExceptionResponse(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }
}

