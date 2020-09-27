package com.ergis.elearning.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "news_attachment")
public class NewsAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "File name cannot be blank")
    private String fileName;
    @NotBlank(message = "Content type cannot be blank")
    private String contentType;
    @NotNull
    private Boolean isPreviewEnabled;
    private String previewUrl;
    @NotBlank(message = "Download url cannot be blank")
    @Column(unique = true)
    private String downloadUrl;

    public NewsAttachment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
