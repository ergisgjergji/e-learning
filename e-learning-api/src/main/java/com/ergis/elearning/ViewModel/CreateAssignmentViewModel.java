package com.ergis.elearning.ViewModel;

import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class CreateAssignmentViewModel {

    @NotBlank(message = "Assignment name is required")
    private String name;
    private Date due_date;
    private MultipartFile file;

    public CreateAssignmentViewModel() {
    }

    public CreateAssignmentViewModel(@NotBlank(message = "Assignment name is required") String name, Date due_date, MultipartFile file) {
        this.name = name;
        this.due_date = due_date;
        this.file = file;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDue_date() {
        return due_date;
    }

    public void setDue_date(Date due_date) {
        this.due_date = due_date;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
