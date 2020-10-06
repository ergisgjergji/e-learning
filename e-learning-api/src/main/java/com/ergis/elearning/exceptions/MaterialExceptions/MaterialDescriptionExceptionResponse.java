package com.ergis.elearning.exceptions.MaterialExceptions;

public class MaterialDescriptionExceptionResponse {

    private String description;

    public MaterialDescriptionExceptionResponse(String description) {
        this.description = description;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
