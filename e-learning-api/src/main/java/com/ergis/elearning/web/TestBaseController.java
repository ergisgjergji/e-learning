package com.ergis.elearning.web;

import com.ergis.elearning.domain.TestBase;
import com.ergis.elearning.services.TestBaseService;
import com.ergis.elearning.services.errors.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/testbase")
@CrossOrigin
// TEACHER
public class TestBaseController {

    @Autowired
    private TestBaseService testBaseService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    private String username = "teacher1@test.com";

    // Tested [YES] (waiting for JWT)
    @PostMapping("/{course_id}")
    public ResponseEntity<?> createTest(@Valid @RequestBody TestBase newTest, @PathVariable String course_id, BindingResult result, Principal principal) {

        ResponseEntity<?> errors = mapValidationErrorService.MapValidationError(result);
        if(errors != null) return errors;

        TestBase test = testBaseService.create(newTest, Long.parseLong(course_id), principal.getName());
        return new ResponseEntity<TestBase>(test, HttpStatus.CREATED);
    }

    // Tested [YES] (waiting for JWT)
    @GetMapping("/{course_id}/all")
    public ResponseEntity<?> getAllCourseTests(@PathVariable String course_id, Principal principal) {

        Set<TestBase> courseTests = testBaseService.findAllByCourse(Long.parseLong(course_id), principal.getName());
        return new ResponseEntity<Set<TestBase>>(courseTests, HttpStatus.OK);
    }

    // Tested [YES] (waiting for JWT)
    @DeleteMapping("/{course_id}/{testbase_id}")
    public ResponseEntity<?> deleteTest(@PathVariable String course_id, @PathVariable String testbase_id, Principal principal) {

        testBaseService.delete(Long.parseLong(course_id), Long.parseLong(testbase_id), this.username);
        return new ResponseEntity<String>("Test with id '" +testbase_id+ "'was successfully deleted", HttpStatus.OK);
    }
}
