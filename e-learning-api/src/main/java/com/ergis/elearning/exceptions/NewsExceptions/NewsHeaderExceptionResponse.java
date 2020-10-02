package com.ergis.elearning.exceptions.NewsExceptions;

public class NewsHeaderExceptionResponse {

    private String header;

    public NewsHeaderExceptionResponse(String header) {
        this.header = header;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }
}

