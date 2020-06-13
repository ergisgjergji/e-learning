package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ICourseRepository extends CrudRepository<Course, Long> {

    Course getById(Long id);
    Course findByName(String name);
    Course findByIdAndUsers(Long id, User user);

    Set<Course> findAll();
    Set<Course> findAllByUsers(User user);
}
