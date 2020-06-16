package com.ergis.elearning.web;

import com.ergis.elearning.ViewModel.TestViewModel;
import com.ergis.elearning.domain.Test;
import com.ergis.elearning.services.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/test")
@CrossOrigin
public class TestController {

    @Autowired
    private TestService testService;
    private String username = "student1@test.com";

    // STUDENT
    // Tested [YES] (waiting for JWT)
    @GetMapping("/{course_id}/{student_id}/list")
    public ResponseEntity<?> getStudentTestListByCourse(@PathVariable String course_id, @PathVariable String student_id, Principal principal) {

        Set<TestViewModel> testList = testService.getStudentTestListByCourse(Long.parseLong(course_id), Long.parseLong(student_id), principal.getName());
        return new ResponseEntity<Set<TestViewModel>>(testList, HttpStatus.OK);
    }

    // STUDENT
    // Tested [YES] (waiting for JWT)
    @GetMapping("/{course_id}/{test_id}")
    public ResponseEntity<?> getTestById(@PathVariable String course_id, @PathVariable String test_id, Principal principal) {

        Test test = testService.findById(Long.parseLong(course_id), Long.parseLong(test_id), principal.getName());
        return new ResponseEntity<Test>(test, HttpStatus.OK);
    }

    // TEACHER (for the moment)
    // Tested [YES] (waiting for JWT)
    @GetMapping("/{course_id}/{student_id}/completed")
    public ResponseEntity<?> getStudentCompletedTestListByCourse(@PathVariable String course_id, @PathVariable String student_id, Principal principal) {

        Set<Test> studentCourseCompletedTests = testService.getStudentCompletedTestListByCourse(Long.parseLong(course_id), Long.parseLong(student_id), principal.getName());
        return new ResponseEntity<Set<Test>>(studentCourseCompletedTests, HttpStatus.OK);
    }

    // STUDENT
    // Tested [YES] (waiting for JWT)
    @PostMapping("/{course_id}/{test_id}")
    public ResponseEntity<?> evaluateTest(@RequestBody Test test, @PathVariable String course_id, @PathVariable String test_id, Principal principal) {

        testService.evaluateTest(Long.parseLong(course_id), Long.parseLong(course_id), test, principal.getName());
        return new ResponseEntity<String>("Test was evaluated successfully.", HttpStatus.OK);
    }
}
