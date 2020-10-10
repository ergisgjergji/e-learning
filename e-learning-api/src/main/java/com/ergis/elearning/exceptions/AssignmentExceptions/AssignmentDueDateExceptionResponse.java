package com.ergis.elearning.exceptions.AssignmentExceptions;

public class AssignmentDueDateExceptionResponse {

    private String due_date;

    public AssignmentDueDateExceptionResponse(String due_date) {
        this.due_date = due_date;
    }

    public String getDue_date() {
        return this.due_date;
    }

    public void setDue_date(String due_date) {
        this.due_date = due_date;
    }
}
