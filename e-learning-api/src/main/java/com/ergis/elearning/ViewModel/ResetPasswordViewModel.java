package com.ergis.elearning.ViewModel;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;

public class ResetPasswordViewModel {

    private Long id;
    @Length(min = 6, message = "Password must include at least 6 characters")
    private String new_password;

    public ResetPasswordViewModel() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNew_password() {
        return new_password;
    }

    public void setNew_password(String new_password) {
        this.new_password = new_password;
    }
}
