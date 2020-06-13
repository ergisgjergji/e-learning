package com.ergis.elearning.exceptions.CourseExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CourseNameException extends RuntimeException {

    public CourseNameException(String message) {
        super(message);
    }
}
