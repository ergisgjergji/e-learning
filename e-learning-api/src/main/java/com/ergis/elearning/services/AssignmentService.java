package com.ergis.elearning.services;

import com.ergis.elearning.ViewModel.*;
import com.ergis.elearning.domain.*;
import com.ergis.elearning.exceptions.AssignmentExceptions.AssignmentDueDateException;
import com.ergis.elearning.exceptions.AssignmentExceptions.AssignmentIdException;
import com.ergis.elearning.exceptions.AssignmentExceptions.AssignmentNameException;
import com.ergis.elearning.exceptions.LectureExceptions.LectureNameException;
import com.ergis.elearning.exceptions.LectureExceptions.LecturelIdException;
import com.ergis.elearning.exceptions.SolutionExceptions.SolutionIdException;
import com.ergis.elearning.repositories.IAssignmentRepository;
import com.ergis.elearning.repositories.ILectureRepository;
import com.ergis.elearning.repositories.IMaterialRepository;
import com.ergis.elearning.repositories.ISolutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
public class AssignmentService {

    @Autowired
    private CourseService courseService;
    @Autowired
    private UserService userService;
    @Autowired
    private IAssignmentRepository assignmentRepository;
    @Autowired
    private ISolutionRepository solutionRepository;
    @Autowired
    private FileStorageService fileStorageService;

    //#region Helper methods
    private String formatFileName(Course course, MultipartFile file) {
        return StringUtils.cleanPath(course.getId() + "_" + file.getOriginalFilename());
    }
    private void checkForDuplicateFile(String fileName, Course course) throws Exception {

        Assignment assignment = assignmentRepository.findByFileNameAndCourse(fileName, course);
        if(assignment != null) throw new Exception("A document with name '" + fileName + "' already exists");
    }
    private void validateDueDate(Date due_date) {

        // Business logic: due_date must be at least 7 days after the current date
        Date now = new Date();
        long diff = due_date.getTime() - now.getTime();
        int days_diff = (int) TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
        if(days_diff < 7) throw new AssignmentDueDateException("Due date must be at least after 7 days");
    }
    //#endregion

    public Set<Assignment> findAll() {
        return assignmentRepository.findAll();
    }

    public Set<?> findAllByCourse(String course_name, String username) {

        User user = userService.findByUsername(username);
        Course course = courseService.findByNameAndUser(course_name, user);

        if(user.getRole().equals("TEACHER"))
            return assignmentRepository.findAllByCourse(course);

        else if(user.getRole().equals("STUDENT"))
            return assignmentRepository.findAllByCourseAndStudent(course_name, user.getId());

        return null;
    }

    public Set<StudentAssignmentProjection> getStudentAssignments(String username) {

        User user = userService.findByUsername(username);
        return assignmentRepository.findAllByStudent(user.getId());
    }

    public Assignment create(CreateAssignmentViewModel model, String course_name, String username) throws Exception {

        /*
            1. Check if user exists (principal, which is a TEACHER)
            2. Checks if course belongs to this user
            3. Check if assignment name is duplicate for the same course
            4. Format the fileName of assignment file
            5. Check if the course has assignment files with that fileName
            6. Store the assignment using FileStorageService
            7. Create Assignment entity and store it in database, and attach it to the corresponding Course
            8. Foreach registered-student of the course, add a `Solution`
            9. Return the newly created assignment
         */
        User user = userService.findByUsername(username);
        Course course = courseService.findByNameAndUser(course_name, user);

        Assignment duplicateAssignment = assignmentRepository.findByNameAndCourse(model.getName(), course);
        if(duplicateAssignment != null) throw new AssignmentNameException("Assignment with name '" + model.getName() + "' already exists");

        this.validateDueDate(model.getDue_date());

        String formatedFileName = this.formatFileName(course, model.getFile());
        checkForDuplicateFile(formatedFileName, course);
        FileUploadResponse response = fileStorageService.storeAssignment(model.getFile(), formatedFileName);

        Assignment assignment = new Assignment();
        assignment.setName(model.getName());
        assignment.setDue_date(model.getDue_date());
        assignment.setFileName(response.getFileName());
        assignment.setContentType(response.getContentType());
        assignment.setPreviewEnabled(response.getPreviewEnabled());
        assignment.setPreviewUrl(response.getPreviewUrl());
        assignment.setDownloadUrl(response.getDownloadUrl());
        assignment.setCourse(course);
        assignment = assignmentRepository.save(assignment);

        course.getAssignments().add(assignment);

        Set<User> courseStudents = userService.findAllRegisteredStudents(course.getId(), username);
        for (User student : courseStudents) {
            Solution solution = new Solution();
            solution.setAssignment(assignment);
            solution.setStudent(student);
            solutionRepository.save(solution);
        }

        return assignment;
    }

    public void delete(Long assignment_id, String course_name, String username) {

        User user = userService.findByUsername(username);
        Course course = courseService.findByNameAndUser(course_name, user);

        Assignment assignment = assignmentRepository.findByIdAndCourse(assignment_id, course);
        if(assignment == null) throw new AssignmentIdException("Assignment with id '" + assignment_id + "' not found");

        Set<Solution> solutions = solutionRepository.findAllByAssignment(assignment);

        for(Solution solution: solutions) {
            if(solution.getFileName() != null)
                fileStorageService.removeAssignment(solution.getFileName());
            solutionRepository.delete(solution);
        }

        assignmentRepository.delete(assignment);
    }
}
