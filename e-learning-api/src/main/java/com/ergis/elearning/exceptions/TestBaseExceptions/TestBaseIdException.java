package com.ergis.elearning.exceptions.TestBaseExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TestBaseIdException extends RuntimeException {

    public TestBaseIdException(String message) {
        super(message);
    }
}
