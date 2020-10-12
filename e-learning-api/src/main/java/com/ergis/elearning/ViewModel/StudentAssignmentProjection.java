package com.ergis.elearning.ViewModel;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public interface StudentAssignmentProjection {
    String getCourse_name();
    String getAssignment_name();
    String getAssignment_fileName();
    String getAssignment_downloadUrl();
    @JsonFormat(pattern="yyyy-MM-dd")
    Date getDue_date();
    Long getId();
    Long getId_assignment();
    String getFile_name();
    String getDownload_url();
    Boolean getSubmitted();
    @JsonFormat(pattern="yyyy-MM-dd")
    Date getSubmit_date();
    Integer getDays_overdue();
    Boolean getChecked();
    Boolean getPassed();
}
