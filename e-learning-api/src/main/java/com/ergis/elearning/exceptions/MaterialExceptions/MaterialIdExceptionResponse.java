package com.ergis.elearning.exceptions.MaterialExceptions;

public class MaterialIdExceptionResponse {

    private String material_id;

    public MaterialIdExceptionResponse(String material_id) {
        this.material_id = material_id;
    }

    public String getMaterial_id() {
        return this.material_id;
    }

    public void setMaterial_id(String material_id) {
        this.material_id = material_id;
    }
}
