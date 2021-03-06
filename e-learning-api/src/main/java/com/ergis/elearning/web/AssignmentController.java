package com.ergis.elearning.web;

import com.ergis.elearning.ViewModel.*;
import com.ergis.elearning.domain.Assignment;
import com.ergis.elearning.domain.Lecture;
import com.ergis.elearning.services.AssignmentService;
import com.ergis.elearning.services.SolutionService;
import com.ergis.elearning.services.errors.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;
    @Autowired
    private SolutionService solutionService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("/{course_name}/all")
    public ResponseEntity<Set<?>> getAllByCourse(@PathVariable String course_name, Principal principal) {

        Set<?> assignments = assignmentService.findAllByCourse(course_name, principal.getName());
        return new ResponseEntity<Set<?>>(assignments, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Set<StudentAssignmentProjection>> getStudentAssignments(Principal principal) {

        Set<StudentAssignmentProjection> assignments = assignmentService.getStudentAssignments(principal.getName());
        return new ResponseEntity<Set<StudentAssignmentProjection>>(assignments, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/{course_name}")
    public ResponseEntity<Assignment> create(
            @PathVariable String course_name,
            @RequestParam("name") String name,
            @RequestParam("due_date") String due_date,
            @RequestParam("assignment") MultipartFile file,
            Principal principal) throws Exception
    {
        Date date = new SimpleDateFormat("yyyy-MM-dd").parse(due_date);
        CreateAssignmentViewModel model = new CreateAssignmentViewModel(name, date, file);

        Assignment assignment = assignmentService.create(model, course_name, principal.getName());
        return new ResponseEntity<Assignment>(assignment, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @DeleteMapping("/{course_name}/{assignment_id}")
    public ResponseEntity<String> delete(@PathVariable String course_name,  @PathVariable String assignment_id, Principal principal)
    {
        assignmentService.delete(Long.parseLong(assignment_id), course_name, principal.getName());
        return new ResponseEntity<String>("Assignment with id '" + assignment_id + "' deleted successfully.", HttpStatus.OK);
    }

    //#region ================================= ASSIGNMENT - SOLUTION relations ========================================
    @GetMapping("/{assignment_id}/solutions")
    public ResponseEntity<Set<TeacherAssignmentSolutionProjection>> getAssignmentSolutions(@PathVariable String assignment_id, Principal principal) {

        Set<TeacherAssignmentSolutionProjection> solutions = solutionService.findAllTeacherAssignmentSolutions(Long.parseLong(assignment_id), principal.getName());
        return new ResponseEntity<Set<TeacherAssignmentSolutionProjection>>(solutions, HttpStatus.OK);
    }
    //==================================================================================================================
}
