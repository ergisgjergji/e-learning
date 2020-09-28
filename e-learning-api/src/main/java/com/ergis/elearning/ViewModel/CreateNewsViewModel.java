package com.ergis.elearning.ViewModel;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;

public class CreateNewsViewModel {

    @NotBlank(message = "News header is required")
    private String header;
    @NotBlank(message = "News body is required")
    private String body;
    private HashSet<MultipartFile> attachments = new HashSet<MultipartFile>();

    public CreateNewsViewModel() {
    }

    public CreateNewsViewModel(@NotBlank(message = "News header is required") String header, @NotBlank(message = "News body is required") String body, HashSet<MultipartFile> attachments) {
        this.header = header;
        this.body = body;
        this.attachments = attachments;
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

    public HashSet<MultipartFile> getAttachments() {
        return attachments;
    }

    public void setAttachments(HashSet<MultipartFile> attachments) {
        this.attachments = attachments;
    }
}
