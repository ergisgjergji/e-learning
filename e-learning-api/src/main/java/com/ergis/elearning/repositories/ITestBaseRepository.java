package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.TestBase;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ITestBaseRepository extends CrudRepository<TestBase, Long> {

    TestBase findByHeader(String header);
    TestBase findByCourseAndHeader(Course course, String header);
    TestBase findByIdAndCourse(Long id, Course course);

    Set<TestBase> findAllByCourse(Course course);
}
