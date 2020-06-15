package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.Test;
import com.ergis.elearning.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ITestRepository extends CrudRepository<Test, Long> {

    Test findByIdAndUserAndCourse(Long id, User user, Course course);

    Set<Test> findAllByCourseAndUser(Course course, User user);
    Set<Test> findAllByUserAndCourseAndCompleted(User user, Course course, Boolean completed);
}
