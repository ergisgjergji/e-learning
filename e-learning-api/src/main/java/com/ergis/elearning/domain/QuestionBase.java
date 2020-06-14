package com.ergis.elearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "question_base")
public class QuestionBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Question description is required")
    private String description;
    @NotNull(message = "Question type is required")
    private Integer type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_test_base", updatable = false, nullable = false)
    @JsonIgnore
    private TestBase test;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, mappedBy = "question", orphanRemoval = true)
    private Set<AlternativeBase> alternatives = new HashSet<>();

    public QuestionBase() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public TestBase getTest() {
        return test;
    }

    public void setTest(TestBase test) {
        this.test = test;
    }

    public Set<AlternativeBase> getAlternatives() {
        return alternatives;
    }

    public void setAlternatives(Set<AlternativeBase> alternatives) {
        this.alternatives = alternatives;
    }
}
