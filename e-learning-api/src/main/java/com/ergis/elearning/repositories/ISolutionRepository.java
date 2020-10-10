package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Assignment;
import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.Solution;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ISolutionRepository extends CrudRepository<Solution, Long> {

    Set<Solution> findAllByAssignment(Assignment assignment);
}