package com.ergis.elearning.exceptions.MaterialExceptions;

public class MaterialIdExceptionResponse {

    private String id;

    public MaterialIdExceptionResponse(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
