package com.ergis.elearning.web;

import com.ergis.elearning.ViewModel.ITestReportProjection;
import com.ergis.elearning.domain.News;
import com.ergis.elearning.services.NewsService;
import com.ergis.elearning.services.ReportService;
import com.ergis.elearning.services.errors.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.Set;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class ReportsController {

    @Autowired
    private ReportService reportService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("/test-report/{id}")
    @PermitAll
    public ResponseEntity<Set<?>> getTestReport(@PathVariable String id) {

        Set<ITestReportProjection> report = reportService.getTestReport(Long.parseLong(id));
        return new ResponseEntity<Set<?>>(report, HttpStatus.OK);
    }
}
