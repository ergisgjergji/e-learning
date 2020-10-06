package com.ergis.elearning.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, columnDefinition = "TEXT")
    @NotBlank(message = "News header is required")
    private String header;
    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "News body is required")
    private String body;
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss")
    private Date createdTime;
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss")
    private Date updatedTime;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH, mappedBy = "news", orphanRemoval = true)
    private Set<NewsAttachment> attachments = new HashSet<>();

    public News() {
    }

    @PrePersist
    private void onCreate() {
        this.createdTime = new Date();
        this.updatedTime = this.createdTime;
    }

    @PreUpdate
    private void onUpdate() { this.updatedTime = new Date(); }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Date getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }

    public Set<NewsAttachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(Set<NewsAttachment> attachments) {
        this.attachments = attachments;
    }
}
