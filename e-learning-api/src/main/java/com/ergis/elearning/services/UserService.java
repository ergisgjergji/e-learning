package com.ergis.elearning.services;

import com.ergis.elearning.ViewModel.ChangePasswordViewModel;
import com.ergis.elearning.ViewModel.ResetPasswordViewModel;
import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.TestBase;
import com.ergis.elearning.domain.User;
import com.ergis.elearning.exceptions.CourseExceptions.CourseIdException;
import com.ergis.elearning.exceptions.CourseExceptions.CourseNotFoundException;
import com.ergis.elearning.exceptions.UserExceptions.PasswordException;
import com.ergis.elearning.exceptions.UserExceptions.UserIdException;
import com.ergis.elearning.exceptions.UserExceptions.RegistrationDateException;
import com.ergis.elearning.exceptions.UserExceptions.UsernameException;
import com.ergis.elearning.repositories.ICourseRepository;
import com.ergis.elearning.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {

    @Autowired
    private ICourseRepository courseRepository;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private CourseService courseService;
    @Autowired
    private TestBaseService testBaseService;
    @Autowired
    private TestService testService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder; // Comes with Spring Security

    public User create(User user) {

        if(user.getRegistration_date() == null) throw new RegistrationDateException("Registration date is required");

        User existingUser = userRepository.findByUsername(user.getUsername());
        if(existingUser != null) throw new UsernameException("Username '" + user.getUsername() + "' already exists");

        user.setRole(user.getRole().toUpperCase());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public User findById(Long id, String username) {

        // Admin has right to get any user
        // If user not admin, make sure id's match

        User principal = userRepository.findByUsername(username);

        if (!principal.getRole().equals("ADMIN"))
            if (principal.getId() != id) throw new UserIdException("You have no access");

        User user = userRepository.getById(id);
        if(user == null) throw new UserIdException("User with id '" +id+ "' not found");
        return user;
    }

    public User findByUsername(String username) {

        User user = userRepository.findByUsername(username);
        if(user == null) throw new UserIdException("User '" +username+ "' not found");
        return user;
    }

    public Set<User> findAll() {
        return userRepository.findAll();
    }

    public Set<User> findByRole(String role) { return userRepository.findAllByRole(role); }

    public User update(User updatedUser, String username) {

        // Make sure user_id is set
        // Make sure user exists
        // Check the role of principal
        // If not an admin, make sure id belongs to him else throw error
        // Check if username already exists

        // User rights: Change username/full_name/password
        // Admin has also right to change role/faculty

        if(updatedUser.getId() == null) throw new UserIdException("User id is missing");

        User user = userRepository.getById(updatedUser.getId());
        if(user == null) throw new UserIdException("User with id '" +updatedUser.getId()+ "' not found");

        User duplicateUsername = userRepository.findByUsername(updatedUser.getUsername());
        if(duplicateUsername != null)
            if(user.getId() != duplicateUsername.getId())
                throw new UsernameException("Username '" +updatedUser.getUsername()+ "' already exists");

        User principal = userRepository.findByUsername(username);
        if (!principal.getRole().equals("ADMIN")) {
            if (principal.getId() != updatedUser.getId()) throw new UserIdException("You have no access");

            user.setUsername(updatedUser.getUsername());
            user.setFull_name(updatedUser.getFull_name());
        }
        else {
            user.setUsername(updatedUser.getUsername());
            user.setFull_name(updatedUser.getFull_name());
            user.setFaculty(updatedUser.getFaculty());
            user.setRole(updatedUser.getRole());
        }
        
        // Update
        return userRepository.save(user);
    }

    public void changePassword(Long user_id, ChangePasswordViewModel changePasswordViewModel, String username) {

        // If user is an admin changing pw for a student/teacher, no need for old-password matching
        // If it is a user changing his own password, old-password must match

        User principal = userRepository.findByUsername(username);
        User user = userRepository.getById(user_id);
        if(user == null) throw new UserIdException("User with id '" +user_id+ "' not found");

        if (!principal.getRole().equals("ADMIN")) {
            if (principal.getId() != user_id) throw new UserIdException("Invalid user_id");
        }
        
        if (!bCryptPasswordEncoder.matches(changePasswordViewModel.getOld_password(), user.getPassword()))
            throw new PasswordException("Old password is incorrect");

        user.setPassword(bCryptPasswordEncoder.encode(changePasswordViewModel.getNew_password()));
        userRepository.save(user);

    }

    public void resetPassword(ResetPasswordViewModel resetPasswordViewModel, String username) {

        User user = userRepository.getById(resetPasswordViewModel.getId());
        if(user == null) throw new UserIdException("User with id '" +resetPasswordViewModel.getId()+ "' not found");

        user.setPassword(bCryptPasswordEncoder.encode(resetPasswordViewModel.getNew_password()));
        userRepository.save(user);
    }

    public  void delete(Long id) {

        // Validations
        // If user role is teacher, delete his courses too
        // Delete the actual user

        User user = userRepository.getById(id);
        if(user == null) throw new UserIdException("User with id '" +id+ "' not found");

        Set<Course> userCourses = user.getCourses();

        if(user.getRole().equals("TEACHER")) {
            // Delete user relations

            for(Course course: userCourses) {
                courseService.delete(course);
            }
        }
        else if(user.getRole().equals("STUDENT")) {
            // Delete user relations

            user.setCourses(null);
        }

        // Delete user
        userRepository.delete(user);
    }

    //#region ------------------------------------------ USER-COURSE ---------------------------------------------------
    // IMPORTANT: User is the owner of the relationship

    public Set<User> findAllRegisteredStudents(Long course_id, String username) {

        // Make sure teacher has a course with this course_id

        User teacher = this.findByUsername(username);
        Course teacherCourse = courseRepository.findByIdAndUsers(course_id, teacher);
        if(teacherCourse == null) throw new CourseIdException("Course with id '" +course_id+ "' not found");

        return userRepository.findAllByCoursesAndRole(teacherCourse, "STUDENT");
    }

    public Set<User> findAllNotRegisteredStudents(Long course_id, String username) {

        // Validations are performed in the `findAllRegisteredStudents`

        Set<User> allStudents = userRepository.findAllByRole("STUDENT");
        Set<User> registeredStudents = this.findAllRegisteredStudents(course_id, username);

        if(registeredStudents == null) return allStudents;
        allStudents.removeAll(registeredStudents);
        return allStudents;
    }

    public Set<User> addToCourse(Long course_id, Long student_id, String username) {

        // Make sure teacher has a course with this id
        // Make sure student with this id exists
        // Check whether student is already registered
        // Add course in student's list of courses
        // Foreach TestBase of that Course, create a new Test for this student

        User teacher = this.findByUsername(username);
        Course teacherCourse = courseRepository.findByIdAndUsers(course_id, teacher);
        if(teacherCourse == null) throw new CourseIdException("Course with id '" +course_id+ "' not found");

        User student = userRepository.findByIdAndRole(student_id, "STUDENT");
        if(student == null) throw new UserIdException("Student with id '" +student_id+ "' not found");

        Course studentCourse = courseRepository.findByIdAndUsers(course_id, student);
        if(studentCourse != null) throw new CourseNotFoundException("Student is already registered in the course with id " + course_id);

        // Step 1: Add to course
        student.addCourse(teacherCourse);
        userRepository.save(student);

        // Step 2: For each course's TestBase create a Test for student
        Set<TestBase> testBases = testBaseService.findAllByCourse(course_id, username);
        for(TestBase testBase: testBases) {
            testService.create(testBase, teacherCourse, student);
        }

        return userRepository.findAllByCoursesAndRole(teacherCourse, "STUDENT");
    }

    public Set<User> removeFromCourse(Long course_id, Long student_id, String username) {

        // Make sure principal has a course with this id
        // Make sure student with this id exists
        // Check whether student is already unregistered

        User teacher = this.findByUsername(username);
        Course teacherCourse = courseRepository.findByIdAndUsers(course_id, teacher);
        if(teacherCourse == null) throw new CourseIdException("Course with id '" +course_id+ "' not found");

        User student = userRepository.findByIdAndRole(student_id, "STUDENT");
        if(student == null) throw new UserIdException("Student with id '" +student_id+ "' not found");

        Course studentCourse = courseRepository.findByIdAndUsers(course_id, student);
        if(studentCourse == null) throw new CourseNotFoundException("Student is not registered in the course with id '" + course_id);

        student.removeCourse(teacherCourse);
        userRepository.save(student);

        return userRepository.findAllByCoursesAndRole(teacherCourse, "STUDENT");
    }
    //#endregion
}