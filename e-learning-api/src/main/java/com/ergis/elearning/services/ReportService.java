package com.ergis.elearning.services;

import com.ergis.elearning.ViewModel.ITestReportProjection;
import com.ergis.elearning.domain.Course;
import com.ergis.elearning.repositories.ICourseRepository;
import com.ergis.elearning.repositories.ITestBaseRepository;
import com.ergis.elearning.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ReportService {

    @Autowired
    private ITestBaseRepository testBaseRepository;

    public Set<ITestReportProjection> getTestReport(Long testBase_id) {
        return testBaseRepository.getTestReport(testBase_id);
    }
}
