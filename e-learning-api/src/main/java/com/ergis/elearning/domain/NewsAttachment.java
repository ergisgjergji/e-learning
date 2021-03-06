package com.ergis.elearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "news_attachment")
public class NewsAttachment {

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_news", updatable = false, nullable = false)
    @JsonIgnore
    private News news;

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

    public News getNews() {
        return news;
    }

    public void setNews(News news) {
        this.news = news;
    }
}
