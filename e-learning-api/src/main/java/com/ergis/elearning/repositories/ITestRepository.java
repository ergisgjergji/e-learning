package com.ergis.elearning.repositories;

import com.ergis.elearning.ViewModel.ITestProjection;
import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.Test;
import com.ergis.elearning.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ITestRepository extends CrudRepository<Test, Long> {

    Test getById(Long id);
    Test findByIdAndUserAndCourse(Long id, User user, Course course);

    @Query(value = "SELECT id, header, completed, passed FROM test WHERE id_course = :course_id AND id_user = :student_id", nativeQuery = true)
    Set<ITestProjection> getStudentTestListByCourse(@Param("course_id") Long course_id, @Param("student_id") Long student_id);

    Set<Test> findAllByUserAndCourseAndCompleted(User user, Course course, Boolean completed);
}
