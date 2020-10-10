package com.ergis.elearning.exceptions.AssignmentExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AssignmentDueDateException extends RuntimeException {
    public AssignmentDueDateException(String message) {
        super(message);
    }
}
