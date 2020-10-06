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
    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "Material description is required")
    private String description;

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

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date uploadDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_course", updatable = false, nullable = false)
    @JsonIgnore
    private Course course;

    @PrePersist
    private void onCreate() {
        this.uploadDate = new Date();
    }

    public Material() {
    }

    public Material(@NotBlank(message = "Material description is required") String description, FileUploadResponse response, Course course) {
        this.description = description;
        this.fileName = response.getFileName();
        this.contentType = response.getContentType();
        this.isPreviewEnabled = response.getPreviewEnabled();
        this.previewUrl = response.getPreviewUrl();
        this.downloadUrl = response.getDownloadUrl();
        this.course = course;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
