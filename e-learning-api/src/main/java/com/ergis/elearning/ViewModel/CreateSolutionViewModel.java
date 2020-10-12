package com.ergis.elearning.ViewModel;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

public class CreateSolutionViewModel {

    private Long solution_id;
    private MultipartFile file;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date submit_date;

    public CreateSolutionViewModel() {
    }

    public CreateSolutionViewModel(Long solution_id, MultipartFile file, Date submit_date) {
        this.solution_id = solution_id;
        this.file = file;
        this.submit_date = submit_date;
    }


    public Long getSolution_id() {
        return solution_id;
    }

    public void setSolution_id(Long solution_id) {
        this.solution_id = solution_id;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public Date getSubmit_date() {
        return submit_date;
    }

    public void setSubmit_date(Date submit_date) {
        this.submit_date = submit_date;
    }
}
