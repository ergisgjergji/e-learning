package com.ergis.elearning.exceptions.NewsExceptions;

public class NewsIdExceptionResponse {

    private String news_id;

    public NewsIdExceptionResponse(String news_id) {
        this.news_id = news_id;
    }

    public String getNews_id() {
        return news_id;
    }

    public void setNews_id(String news_id) {
        this.news_id = news_id;
    }
}

