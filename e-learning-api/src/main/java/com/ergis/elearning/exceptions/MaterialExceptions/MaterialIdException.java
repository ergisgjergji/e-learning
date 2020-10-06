package com.ergis.elearning.exceptions.MaterialExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MaterialIdException extends RuntimeException {
    public MaterialIdException(String message) {
        super(message);
    }
}
