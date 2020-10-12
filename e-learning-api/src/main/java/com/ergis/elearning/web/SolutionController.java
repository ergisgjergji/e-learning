package com.ergis.elearning.web;

import com.ergis.elearning.ViewModel.CreateSolutionViewModel;
import com.ergis.elearning.ViewModel.TeacherAssignmentSolutionProjection;
import com.ergis.elearning.domain.Solution;
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
import java.util.Date;

@RestController
@RequestMapping("/api/solutions")
@CrossOrigin
public class SolutionController {

    @Autowired
    private AssignmentService assignmentService;
    @Autowired
    private SolutionService solutionService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/{solution_id}")
    public ResponseEntity<Solution> updateSolution(@PathVariable String solution_id, @RequestParam("solution") MultipartFile file, Principal principal) throws Exception
    {
        Date nowDate = new Date();
        CreateSolutionViewModel model = new CreateSolutionViewModel(Long.parseLong(solution_id), file, nowDate);

        Solution solution = solutionService.updateSolution(model, principal.getName());
        return new ResponseEntity<Solution>(solution, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/{solution_id}/grade")
    public ResponseEntity<Solution> gradeSolution(@PathVariable String solution_id, @RequestBody Boolean passed, Principal principal) throws Exception
    {
        Solution solution = solutionService.gradeSolution(Long.parseLong(solution_id), passed, principal.getName());
        return new ResponseEntity<Solution>(solution, HttpStatus.OK);
    }
}
