package com.ergis.elearning.exceptions.QuestionBaseExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class QuestionBaseTypeException extends RuntimeException {

    public QuestionBaseTypeException(String message) {
        super(message);
    }
}
