package com.ergis.elearning.exceptions.NewsExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NewsIdException extends RuntimeException {

    public NewsIdException(String message) {
        super(message);
    }
}
