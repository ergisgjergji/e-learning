package com.ergis.elearning.exceptions.TestExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TestIdException extends RuntimeException {

    public TestIdException(String message) {
        super(message);
    }
}