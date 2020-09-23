package com.ergis.elearning.exceptions.FileUploadExceptions;

public class FileUploadExceptionResponse {

    private String file;

    public FileUploadExceptionResponse(String file) {
        this.file = file;
    }

    public String getFile() {
        return this.file;
    }

    public void setFile(String file) {
        this.file = file;
    }
}
