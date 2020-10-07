package com.ergis.elearning.exceptions.LectureExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class LectureNameException extends RuntimeException {
    public LectureNameException(String message) {
        super(message);
    }
}
