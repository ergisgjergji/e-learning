package com.ergis.elearning.exceptions.UserExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RoleException extends RuntimeException {

    public RoleException(String message) { super(message); }
}
