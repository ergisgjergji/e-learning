package com.ergis.elearning.services;

import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.User;
import com.ergis.elearning.exceptions.CourseExceptions.CourseIdException;
import com.ergis.elearning.exceptions.CourseExceptions.CourseNameException;
import com.ergis.elearning.exceptions.CourseExceptions.CourseNotFoundException;
import com.ergis.elearning.exceptions.UserExceptions.UserIdException;
import com.ergis.elearning.repositories.ICourseRepository;
import com.ergis.elearning.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CourseService {

    @Autowired
    private ICourseRepository courseRepository;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private UserService userService;

    public Course create(Course course, String username) {

        Course existingCourse = courseRepository.findByName(course.getName());
        if(existingCourse != null) throw new CourseNameException("Course with name '" +existingCourse.getName()+ "' already exists");

        User teacher = userService.findByUsername(username);
        teacher.addCourse(course);
        course.setTeacher_name(teacher.getFull_name());
        course.setTeacher_email(username);

        return courseRepository.save(course);
    }

    public Course findById(Long id) { return courseRepository.getById(id); }

    public Course findByIdAndUser(Long id, User user) { return courseRepository.findByIdAndUsers(id, user); }

    public Set<Course> findAll() { return courseRepository.findAll(); }

    public Set<Course> findAllByUser(String username) { return courseRepository.findAllByUsers(userService.findByUsername(username)); }

    public Course update(Course updatedCourse, String username) {

        // Only 'name' and 'description' are allowed to be updated
        // Make sure course_id is set
        // Make sure principal has a course with this id

        if(updatedCourse.getId() == null) throw new CourseIdException("Course id is missing");

        User user = userService.findByUsername(username);
        Course course = courseRepository.findByIdAndUsers(updatedCourse.getId(), user);
        if(course == null) throw new CourseIdException("Course with id '" +updatedCourse.getId()+ "' not found");

        Course duplicateName = courseRepository.findByName(updatedCourse.getName());
        if(duplicateName != null)
            if(duplicateName.getId().longValue() != course.getId().longValue())
                throw new CourseNameException("A course with name '" +updatedCourse.getName()+ "' already exists");

        course.setName(updatedCourse.getName());
        course.setDescription(updatedCourse.getDescription());

        return courseRepository.save(course);
    }

    public void delete(Course course) {

        // Delete course relations
        Set<User> users = course.getUsers();
        for(User user: users) {
            user.removeCourse(course);
        }

        // Delete course
        courseRepository.delete(course);
    }

    public void delete(Long course_id, String username) {

        // Check if principal has a course with this id

        User user = userService.findByUsername(username);
        Course course = courseRepository.findByIdAndUsers(course_id, user);
        if(course == null) throw new CourseIdException("Course with id '" +course_id+ "' not found");

        this.delete(course);
    }
}
