package com.ergis.elearning.exceptions.LectureExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class LecturelIdException extends RuntimeException {
    public LecturelIdException(String message) {
        super(message);
    }
}
