package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Assignment;
import com.ergis.elearning.domain.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IAssignmentRepository extends CrudRepository<Assignment, Long> {

    Set<Assignment> findAll();
    Set<Assignment> findAllByCourse(Course course);

    Assignment getById(Long id);
    Assignment findByIdAndCourse(Long id, Course course);
    Assignment findByNameAndCourse(String name, Course course);
    Assignment findByFileNameAndCourse(String fileName, Course course);
}