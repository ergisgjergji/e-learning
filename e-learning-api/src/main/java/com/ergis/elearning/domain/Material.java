package com.ergis.elearning.domain;

import com.ergis.elearning.ViewModel.FileUploadResponse;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotBlank(message = "File name cannot be blank")
    private String fileName;
    @NotBlank(message = "Content type cannot be blank")
    private String contentType;
    @NotNull
    private Boolean isPreviewEnabled;
    @Column(columnDefinition = "TEXT")
    private String previewUrl;
    @NotBlank(message = "Download url cannot be blank")
    @Column(unique = true, columnDefinition = "TEXT")
    private String downloadUrl;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss")
    private Date uploadTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_lecture", updatable = false, nullable = false)
    @JsonIgnore
    private Lecture lecture;

    @PrePersist
    private void onCreate() {
        this.uploadTime = new Date();
    }

    public Material() {
    }

    public Material(FileUploadResponse response, Lecture lecture) {
        this.fileName = response.getFileName();
        this.contentType = response.getContentType();
        this.isPreviewEnabled = response.getPreviewEnabled();
        this.previewUrl = response.getPreviewUrl();
        this.downloadUrl = response.getDownloadUrl();
        this.lecture = lecture;
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

    public Date getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(Date uploadTime) {
        this.uploadTime = uploadTime;
    }

    public Lecture getLecture() {
        return lecture;
    }

    public void setLecture(Lecture lecture) {
        this.lecture = lecture;
    }
}
