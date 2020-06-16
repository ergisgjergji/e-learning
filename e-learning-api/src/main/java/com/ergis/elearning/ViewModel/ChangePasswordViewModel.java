package com.ergis.elearning.ViewModel;

import javafx.scene.control.TextFormatter;
import org.hibernate.validator.constraints.Length;

public class ChangePasswordViewModel {

    private Long id;
    private String old_password;
    @Length(min = 6, message = "Password must include at least 6 characters")
    private String new_password;

    public ChangePasswordViewModel() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOld_password() {
        return old_password;
    }

    public void setOld_password(String old_password) {
        this.old_password = old_password;
    }

    public String getNew_password() {
        return new_password;
    }

    public void setNew_password(String new_password) {
        this.new_password = new_password;
    }
}
