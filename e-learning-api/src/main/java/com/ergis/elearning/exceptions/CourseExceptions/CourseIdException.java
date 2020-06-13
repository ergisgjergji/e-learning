package com.ergis.elearning.exceptions.CourseExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CourseIdException extends RuntimeException {

    public CourseIdException(String message) {
        super(message);
    }
}
