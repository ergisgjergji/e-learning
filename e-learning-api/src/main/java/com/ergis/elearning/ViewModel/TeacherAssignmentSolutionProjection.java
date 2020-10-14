package com.ergis.elearning.ViewModel;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public interface TeacherAssignmentSolutionProjection {

    Long getId();
    String getStudent_name();
    String getFile_name();
    String getDownload_url();
    boolean isSubmitted();
    boolean isChecked();
    boolean isPassed();
    @JsonFormat(pattern="yyyy-MM-dd")
    Date getSubmit_date();
    Integer getDays_overdue();
}
