package com.ergis.elearning.ViewModel;

import java.util.Date;

public interface TeacherAssignmentSolutionProjection {

    Long getId();
    String getStudent_name();
    String getFileName();
    String getDownloadUrl();
    boolean isSubmitted();
    boolean isChecked();
    boolean isPassed();
    Date getSubmit_date();
    Integer getDays_overdue();
}
