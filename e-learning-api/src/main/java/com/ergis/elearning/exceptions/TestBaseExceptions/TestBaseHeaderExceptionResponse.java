package com.ergis.elearning.exceptions.TestBaseExceptions;

public class TestBaseHeaderExceptionResponse {

    private String header;

    public TestBaseHeaderExceptionResponse(String header) {
        this.header = header;
    }

    public String getHeader() {
        return this.header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

}
