package com.ergis.elearning.exceptions.CourseExceptions;

public class CourseNameExceptionResponse {

    private String name;

    public CourseNameExceptionResponse(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
