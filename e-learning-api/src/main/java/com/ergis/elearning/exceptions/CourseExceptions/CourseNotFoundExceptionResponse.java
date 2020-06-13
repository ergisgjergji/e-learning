package com.ergis.elearning.exceptions.CourseExceptions;

public class CourseNotFoundExceptionResponse {

    private String course_id;

    public CourseNotFoundExceptionResponse(String course_id) {
        this.course_id = course_id;
    }

    public String getCourse_id() {
        return course_id;
    }

    public void setCourse_id(String course_id) {
        this.course_id = course_id;
    }
}
