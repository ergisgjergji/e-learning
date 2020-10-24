package com.ergis.elearning.repositories;

import com.ergis.elearning.ViewModel.ITestProjection;
import com.ergis.elearning.ViewModel.ITestReportProjection;
import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.TestBase;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ITestBaseRepository extends CrudRepository<TestBase, Long> {

    TestBase findByHeader(String header);
    TestBase findByCourseAndHeader(Course course, String header);
    TestBase findByIdAndCourse(Long id, Course course);

    @Query(value = "CALL test_report(:testbase_id)", nativeQuery = true)
    Set<ITestReportProjection> getTestReport(@Param("testbase_id") Long testbase_id);

    Set<TestBase> findAllByCourse(Course course);
}
