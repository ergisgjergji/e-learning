package com.ergis.elearning.exceptions.LectureExceptions;

public class LectureIdExceptionResponse {

    private String id;

    public LectureIdExceptionResponse(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
