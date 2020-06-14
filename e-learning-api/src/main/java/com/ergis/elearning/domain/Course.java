package com.ergis.elearning.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
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
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date created_date;
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date updated_date;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "courses")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH, mappedBy = "course", orphanRemoval = true)
    private Set<TestBase> tests = new HashSet<>();

    public Course() {}

    @PrePersist
    private void onCreate() {
        this.created_date = new Date();
        this.updated_date = this.created_date;
    }

    @PreUpdate
    private void onUpdate() { this.updated_date = new Date(); }

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

    public Set<TestBase> getTests() {
        return tests;
    }

    public void setTests(Set<TestBase> tests) {
        this.tests = tests;
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
