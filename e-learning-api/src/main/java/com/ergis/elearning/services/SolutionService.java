package com.ergis.elearning.services;

import com.ergis.elearning.ViewModel.CreateSolutionViewModel;
import com.ergis.elearning.ViewModel.FileUploadResponse;
import com.ergis.elearning.ViewModel.StudentAssignmentProjection;
import com.ergis.elearning.ViewModel.TeacherAssignmentSolutionProjection;
import com.ergis.elearning.domain.Assignment;
import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.Solution;
import com.ergis.elearning.domain.User;
import com.ergis.elearning.exceptions.AssignmentExceptions.AssignmentDueDateException;
import com.ergis.elearning.exceptions.AssignmentExceptions.AssignmentIdException;
import com.ergis.elearning.exceptions.CourseExceptions.CourseIdException;
import com.ergis.elearning.exceptions.SolutionExceptions.SolutionIdException;
import com.ergis.elearning.repositories.IAssignmentRepository;
import com.ergis.elearning.repositories.ICourseRepository;
import com.ergis.elearning.repositories.ISolutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
public class SolutionService {

    @Autowired
    private CourseService courseService;
    @Autowired
    private UserService userService;
    @Autowired
    private IAssignmentRepository assignmentRepository;
    @Autowired
    private ICourseRepository courseRepository;
    @Autowired
    private ISolutionRepository solutionRepository;
    @Autowired
    private FileStorageService fileStorageService;

    //#region Helper methods
    private String formatFileName(Solution solution, MultipartFile file) {
        return StringUtils.cleanPath(solution.getId() + "_" + file.getOriginalFilename());
    }
    //#endregion

    public Set<TeacherAssignmentSolutionProjection> findAllTeacherAssignmentSolutions(Long assignment_id, String username) {

        Assignment assignment = assignmentRepository.getById(assignment_id);
        User user = userService.findByUsername(username);
        Course course = courseRepository.findByAssignmentsAndUsers(assignment, user);
        if(course == null) throw new AssignmentIdException("Assignment with id '" + assignment_id + "' doesn't belong to any of your courses");

        Set<TeacherAssignmentSolutionProjection> solutions = solutionRepository.findAllTeacherAssignmentSolutions(assignment_id);
        return solutions;
    }

    public Solution updateSolution(CreateSolutionViewModel model, String username) throws Exception {
        /*
            1. Make sure solution belongs to the current user
            2. Make sure solution has not been previously submitted
            3. Format the filename and store the solution
            4. Update the Solution entity
         */

        User user = userService.findByUsername(username);
        Solution solution = solutionRepository.findByIdAndStudent(model.getSolution_id(), user);
        if(solution == null) throw new SolutionIdException("Solution with id '" + model.getSolution_id() + "' not found");
        if(solution.isSubmitted()) throw new Exception("Solution has already been submitted");

        String formatedFileName = this.formatFileName(solution, model.getFile());
        FileUploadResponse respose = fileStorageService.storeSolution(model.getFile(), formatedFileName);

        solution.setFileName(respose.getFileName());
        solution.setDownloadUrl(respose.getDownloadUrl());
        solution.setSubmitted(true);
        solution.setSubmit_date(model.getSubmit_date());

        long diff = model.getSubmit_date().getTime() - solution.getAssignment().getDue_date().getTime();
        int days_diff = (int) TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
        solution.setDays_overdue((days_diff < 0 ? 0 : days_diff));

        return solutionRepository.save(solution);
    }

    public Solution gradeSolution(Long solution_id, Boolean passed, String username) throws Exception {
        /*
            1. Make sure solution belongs to an assignment that belongs to you
            2. Make sure solution has been submitted
            3. Make sure solution has not been checked before (graded before)
        */

        User user = userService.findByUsername(username);
        Solution solution = solutionRepository.getById(solution_id);
        Course solutionCourse = solution.getAssignment().getCourse();

        if(!user.getCourses().contains(solutionCourse)) throw new CourseIdException("Course with id '" + solutionCourse.getId() + "' not found");
        if(!solution.isSubmitted()) throw new Exception("Solution has not been submitted yet");
        if(solution.isChecked()) throw new Exception("Solution has already been graded");

        solution.setChecked(true);
        solution.setPassed(passed);
        return solutionRepository.save(solution);
    }
}
