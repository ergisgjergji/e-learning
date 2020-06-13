package com.ergis.elearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Course name is required")
    @Column(unique = true)
    private String name;
    @NotBlank(message = "Course description is required")
    private String description;
    private String teacher_name;
    private String teacher_email;
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "courses")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    public Course() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTeacher_name() {
        return teacher_name;
    }

    public void setTeacher_name(String owner_name) {
        this.teacher_name = owner_name;
    }

    public String getTeacher_email() {
        return teacher_email;
    }

    public void setTeacher_email(String owner_email) {
        this.teacher_email = owner_email;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    /*
        Utility methods for ManyToMany relationship
     */

    public void addUser(User user) {
        this.users.add(user);
    }

    public void removeUser(User user) {
        this.users.remove(user);
    }
}
