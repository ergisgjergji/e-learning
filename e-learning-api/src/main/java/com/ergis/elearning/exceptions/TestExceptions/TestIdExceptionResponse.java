package com.ergis.elearning.exceptions.TestExceptions;

public class TestIdExceptionResponse {

    private String test_id;

    public TestIdExceptionResponse(String test_id) {
        this.test_id = test_id;
    }

    public String getTest_id() {
        return this.test_id;
    }

    public void setTest_id(String test_id) {
        this.test_id = test_id;
    }
}