package com.ergis.elearning.web;

import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.User;
import com.ergis.elearning.exceptions.CourseExceptions.CourseIdException;
import com.ergis.elearning.services.CourseService;
import com.ergis.elearning.services.UserService;
import com.ergis.elearning.services.errors.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/course")
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseService courseService;
    @Autowired
    private UserService userService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("")
    public ResponseEntity<?> createCourse(@Valid @RequestBody Course course, BindingResult result, Principal principal) {

        ResponseEntity<?> errors = mapValidationErrorService.MapValidationError(result);
        if(errors != null) return errors;

        Course course1 = courseService.create(course, principal.getName());
        return new ResponseEntity<Course>(course1, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PutMapping("")
    public ResponseEntity<?> updateCourse(@Valid @RequestBody Course course, BindingResult result, Principal principal) {

        ResponseEntity<?> errors = mapValidationErrorService.MapValidationError(result);
        if(errors != null) return errors;

        Course updatedCourse = courseService.update(course, principal.getName());
        return new ResponseEntity<Course>(updatedCourse, HttpStatus.OK);
    }

    @GetMapping("/{course_id}")
    public ResponseEntity<?> getCourseById(@PathVariable String course_id, Principal principal) {

        User user = userService.findByUsername(principal.getName());
        Course course = courseService.findByIdAndUser(Long.parseLong(course_id), user);

        return new ResponseEntity<Course>(course, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCourses(Principal principal) {

        Set<Course> courses = courseService.findAllByUser(principal.getName());
        return new ResponseEntity<Set<Course>>(courses, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @DeleteMapping("/{course_id}")
    public ResponseEntity<?> deleteCourse(@PathVariable String course_id, Principal principal) {

        courseService.delete(Long.parseLong(course_id), principal.getName());
        return new ResponseEntity<String>("Course with id '" + course_id + "' was successfully deleted", HttpStatus.OK);
    }


    //#region ------------------------------------------ USER-COURSE ---------------------------------------------------

    @PreAuthorize("hasRole('TEACHER')")
    @GetMapping("/{course_id}/students/registered")
    public ResponseEntity<?> getAllRegisteredStudents(@PathVariable String course_id, Principal principal) {

        Set<User> registeredStudents = userService.findAllRegisteredStudents(Long.parseLong(course_id), principal.getName());
        return new ResponseEntity<Set<User>>(registeredStudents, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @GetMapping("/{course_id}/students/not-registered")
    public ResponseEntity<?> getAllNonRegisteredStudents(@PathVariable String course_id, Principal principal) {

        Set<User> registeredStudents = userService.findAllNotRegisteredStudents(Long.parseLong(course_id), principal.getName());
        return new ResponseEntity<Set<User>>(registeredStudents, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/{course_id}/students/{student_id}")
    public ResponseEntity<?> addStudent(@PathVariable String course_id, @PathVariable String student_id, Principal principal) {

        Set<User> courseStudents = userService.addToCourse(Long.parseLong(course_id), Long.parseLong(student_id), principal.getName());
        return new ResponseEntity<Set<User>>(courseStudents, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @DeleteMapping("/{course_id}/students/{student_id}")
    public ResponseEntity<?> removeStudent(@PathVariable String course_id, @PathVariable String student_id, Principal principal) {

        Set<User> courseStudents = userService.removeFromCourse(Long.parseLong(course_id), Long.parseLong(student_id), principal.getName());
        return new ResponseEntity<Set<User>>(courseStudents, HttpStatus.OK);
    }

    //endregion
}
