package com.ergis.elearning.exceptions.QuestionBaseExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class QuestionBaseAlternativesException extends RuntimeException {

    public QuestionBaseAlternativesException(String message) {
        super(message);
    }
}
