package com.ergis.elearning.ViewModel;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

public class CreateLectureViewModel {

    @NotBlank(message = "Lecture name is required")
    private String name;

    private MultipartFile[] files;

    public CreateLectureViewModel() {
    }

    public CreateLectureViewModel(@NotBlank(message = "Material description is required") String name, MultipartFile[] files) {
        this.name = name;
        this.files = files;
    }

    public String getName() {
        return name;
    }

    public void setName(String description) {
        this.name = name;
    }

    public MultipartFile[] getFiles() {
        return files;
    }

    public void setFiles(MultipartFile[] file) {
        this.files = files;
    }
}