package com.ergis.elearning.repositories;

import com.ergis.elearning.ViewModel.StudentAssignmentProjection;
import com.ergis.elearning.domain.Assignment;
import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IAssignmentRepository extends CrudRepository<Assignment, Long> {

    Set<Assignment> findAll();
    Set<Assignment> findAllByCourse(Course course);

    @Query(value =
            "SELECT " +
                    "c.name as course_name, " +
                    "a.name as assignment_name, " +
                    "a.file_name as assignment_fileName, " +
                    "a.download_url as assignment_downloadUrl, " +
                    "a.due_date, " +
                    "s.* " +
                    "FROM solution s " +
                    "JOIN assignment a ON a.id = s.id_assignment " +
                    "JOIN course c ON c.id = a.id_course AND c.name = :course_name " +
                    "WHERE s.id_student = :student_id", nativeQuery = true)
    Set<StudentAssignmentProjection> findAllByCourseAndStudent(@Param("course_name") String course_name, @Param("student_id") Long student_id);

    @Query(value =
            "SELECT " +
                    "c.name as course_name, " +
                    "a.name as assignment_name, " +
                    "a.file_name as assignment_fileName, " +
                    "a.download_url as assignment_downloadUrl, " +
                    "a.due_date, " +
                    "s.* " +
                    "FROM solution s " +
                    "JOIN assignment a ON a.id = s.id_assignment " +
                    "JOIN course c ON c.id = a.id_course " +
                    "WHERE s.id_student = :student_id", nativeQuery = true)
    Set<StudentAssignmentProjection> findAllByStudent(@Param("student_id") Long student_id);

    Assignment getById(Long id);
    Assignment findByIdAndCourse(Long id, Course course);
    Assignment findByNameAndCourse(String name, Course course);
    Assignment findByFileNameAndCourse(String fileName, Course course);
}