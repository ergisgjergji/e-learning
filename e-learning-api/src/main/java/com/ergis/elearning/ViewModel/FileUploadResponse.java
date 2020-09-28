package com.ergis.elearning.ViewModel;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class FileUploadResponse {

    private String fileName;
    private String contentType;
    private Boolean isPreviewEnabled;
    private String previewUrl;
    private String downloadUrl;

    public FileUploadResponse() {
    }

    public FileUploadResponse(String fileName, String contentType, Boolean isPreviewEnabled, String previewUrl, String downloadUrl) {
        this.fileName = fileName;
        this.contentType = contentType;
        this.isPreviewEnabled = isPreviewEnabled;
        this.previewUrl = previewUrl;
        this.downloadUrl = downloadUrl;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Boolean getPreviewEnabled() {
        return isPreviewEnabled;
    }

    public void setPreviewEnabled(Boolean previewEnabled) {
        isPreviewEnabled = previewEnabled;
    }

    public String getPreviewUrl() {
        return previewUrl;
    }

    public void setPreviewUrl(String previewUrl) {
        this.previewUrl = previewUrl;
    }

    public String getDownloadUrl() {
        return downloadUrl;
    }

    public void setDownloadUrl(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }
}
