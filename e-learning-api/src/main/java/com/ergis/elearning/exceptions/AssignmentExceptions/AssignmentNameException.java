package com.ergis.elearning.exceptions.AssignmentExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AssignmentNameException extends RuntimeException {
    public AssignmentNameException(String message) {
        super(message);
    }
}