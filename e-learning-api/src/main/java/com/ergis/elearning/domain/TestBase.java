package com.ergis.elearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "test_base")
public class TestBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Test header is required")
    private String header;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_course", updatable = false, nullable = false)
    @JsonIgnore
    private Course course;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, mappedBy = "test", orphanRemoval = true)
    private Set<QuestionBase> questions = new HashSet<>();

    public TestBase() {}

    public TestBase(@NotBlank(message = "Test header is required") String header) {
        this.header = header;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Set<QuestionBase> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<QuestionBase> questions) {
        this.questions = questions;
    }
}
