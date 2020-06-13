package com.ergis.elearning.exceptions.CourseExceptions;

public class CourseIdExceptionResponse {

    private String course_id;

    public CourseIdExceptionResponse(String course_id) {
        this.course_id = course_id;
    }

    public String getCourse_id() {
        return this.course_id;
    }

    public void setCourse_id(String course_id) {
        this.course_id = course_id;
    }
}
