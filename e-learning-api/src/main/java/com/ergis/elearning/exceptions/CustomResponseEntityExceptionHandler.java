package com.ergis.elearning.exceptions;

import com.ergis.elearning.exceptions.CourseExceptions.*;
import com.ergis.elearning.exceptions.QuestionBaseExceptions.QuestionBaseAlternativesException;
import com.ergis.elearning.exceptions.QuestionBaseExceptions.QuestionBaseAlternativesExceptionResponse;
import com.ergis.elearning.exceptions.QuestionBaseExceptions.QuestionBaseTypeException;
import com.ergis.elearning.exceptions.QuestionBaseExceptions.QuestionBaseTypeExceptionResponse;
import com.ergis.elearning.exceptions.TestBaseExceptions.TestBaseIdException;
import com.ergis.elearning.exceptions.TestBaseExceptions.TestBaseIdExceptionResponse;
import com.ergis.elearning.exceptions.TestBaseExceptions.TestBaseQuestionsException;
import com.ergis.elearning.exceptions.TestBaseExceptions.TestBaseQuestionsExceptionResponse;
import com.ergis.elearning.exceptions.TestExceptions.TestIdException;
import com.ergis.elearning.exceptions.TestExceptions.TestIdExceptionResponse;
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

    //#region - User Exceptions -
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
    public final ResponseEntity<Object> handlePasswordException(PasswordException ex, WebRequest request) {
        PasswordExceptionResponse exceptionResponse = new PasswordExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleRegistrationDateException(RegistrationDateException ex, WebRequest request) {
        RegistrationDateExceptionResponse exceptionResponse = new RegistrationDateExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
    //#endregion

    //#region - Course Exceptions -
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
    //#endregion-------------

    //#region - TestBase Exceptions -
    @ExceptionHandler
    public final ResponseEntity<Object> handleTestBaseIdException(TestBaseIdException ex, WebRequest request) {
        TestBaseIdExceptionResponse exceptionResponse = new TestBaseIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleTestBaseQuestionsException(TestBaseQuestionsException ex, WebRequest request) {
        TestBaseQuestionsExceptionResponse exceptionResponse = new TestBaseQuestionsExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
    //#endregion

    //#region - QuestionBase Exceptions -
    @ExceptionHandler
    public final ResponseEntity<Object> handleQuestionBaseTypeException(QuestionBaseTypeException ex, WebRequest request) {
        QuestionBaseTypeExceptionResponse exceptionResponse = new QuestionBaseTypeExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleQuestionBaseAlternativesException(QuestionBaseAlternativesException ex, WebRequest request) {
        QuestionBaseAlternativesExceptionResponse exceptionResponse = new QuestionBaseAlternativesExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
    //#endregion

    //#region - Test Exceptions -
    @ExceptionHandler
    public final ResponseEntity<Object> handleTestIdException(TestIdException ex, WebRequest request) {
        TestIdExceptionResponse exceptionResponse = new TestIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
    //#endregion
}