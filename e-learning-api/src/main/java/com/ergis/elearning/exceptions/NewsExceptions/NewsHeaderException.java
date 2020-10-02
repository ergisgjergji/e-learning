package com.ergis.elearning.exceptions.NewsExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NewsHeaderException extends RuntimeException {

    public NewsHeaderException(String message) {
        super(message);
    }
}
