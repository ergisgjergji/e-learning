package com.ergis.elearning.repositories;

import com.ergis.elearning.ViewModel.StudentAssignmentProjection;
import com.ergis.elearning.ViewModel.TeacherAssignmentSolutionProjection;
import com.ergis.elearning.domain.Assignment;
import com.ergis.elearning.domain.Solution;
import com.ergis.elearning.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ISolutionRepository extends CrudRepository<Solution, Long> {

    @Query(value =
            "SELECT " +
                "s.*, " +
                "u.full_name as student_name " +
            "FROM solution s " +
            "JOIN user u ON u.id = s.id_student " +
            "WHERE s.id_assignment = :assignment_id", nativeQuery = true)
    Set<TeacherAssignmentSolutionProjection> findAllTeacherAssignmentSolutions(@Param("assignment_id") Long assignment_id);

    Set<Solution> findAllByAssignment(Assignment assignment);

    Solution getById(Long id);
    Solution findByIdAndStudent(Long id, User user);
}