package com.ergis.elearning.exceptions;

import com.ergis.elearning.exceptions.CourseExceptions.*;
import com.ergis.elearning.exceptions.UserExceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    // ----------------------------------------- User Exceptions -----------------------------------------
    @ExceptionHandler
    public final ResponseEntity<Object> handleIdNotFoundException(UserIdException ex, WebRequest request) {
        UserIdExceptionResponse exceptionResponse = new UserIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameException(UsernameException ex, WebRequest request) {
        UsernameExceptionResponse exceptionResponse = new UsernameExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleRegistrationDateException(RegistrationDateException ex, WebRequest request) {
        RegistrationDateExceptionResponse exceptionResponse = new RegistrationDateExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    // ----------------------------------------- Course Exceptions -----------------------------------------
    @ExceptionHandler
    public final ResponseEntity<Object> handleCourseNotFoundException(CourseNotFoundException ex, WebRequest request) {
        CourseNotFoundExceptionResponse exceptionResponse = new CourseNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleCourseIdException(CourseIdException ex, WebRequest request) {
        CourseIdExceptionResponse exceptionResponse = new CourseIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleCourseNamedException(CourseNameException ex, WebRequest request) {
        CourseNameExceptionResponse exceptionResponse = new CourseNameExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}
