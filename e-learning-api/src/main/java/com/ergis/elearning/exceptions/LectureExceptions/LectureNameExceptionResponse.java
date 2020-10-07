package com.ergis.elearning.exceptions.LectureExceptions;

public class LectureNameExceptionResponse {

    private String name;

    public LectureNameExceptionResponse(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
