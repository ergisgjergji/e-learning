package com.ergis.elearning.ViewModel;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

public class CreateMaterialViewModel {

    @NotBlank(message = "Material description is required")
    private String description;

    private MultipartFile file;

    public CreateMaterialViewModel() {
    }

    public CreateMaterialViewModel(@NotBlank(message = "Material description is required") String description, MultipartFile file) {
        this.description = description;
        this.file = file;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}