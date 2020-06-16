package com.ergis.elearning.services;

import com.ergis.elearning.ViewModel.TestViewModel;
import com.ergis.elearning.domain.*;
import com.ergis.elearning.exceptions.CourseExceptions.CourseIdException;
import com.ergis.elearning.exceptions.TestBaseExceptions.TestBaseIdException;
import com.ergis.elearning.exceptions.TestExceptions.TestIdException;
import com.ergis.elearning.exceptions.UserExceptions.UserIdException;
import com.ergis.elearning.repositories.*;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class TestService {

    @Autowired
    private ITestRepository testRepository;
    @Autowired
    private IQuestionRepository questionRepository;
    @Autowired
    private IAlternativeRepository alternativeRepository;
    @Autowired
    private ICourseRepository courseRepository;
    @Autowired
    private IUserRepository userRepository;

    public void create(TestBase testBase, Course course, User student) {

        Test test = new Test();
        test.setHeader(testBase.getHeader());
        test.setScored_points(0);
        test.setTotal_points(testBase.getQuestions().size());
        test.setCompleted(false);
        test.setPassed(false);
        test.setCourse(course);
        test.setUser(student);
        testRepository.save(test);

        for (QuestionBase questionBase : testBase.getQuestions()) {
            Question question = new Question();
            question.setDescription(questionBase.getDescription());
            question.setType(questionBase.getType());
            question.setTest(test);
            questionRepository.save(question);

            for (AlternativeBase alternativeBase : questionBase.getAlternatives()) {
                Alternative alternative = new Alternative();
                alternative.setDescription(alternativeBase.getDescription());
                alternative.setCorrect(alternativeBase.getCorrect());
                alternative.setChecked(false);
                alternative.setQuestion(question);
                alternativeRepository.save(alternative);
            }
        }
    }

    public Test findById(Long course_id, Long test_id, String username) {

        // Make sure course exists and belongs to user
        // Make sure test exists and belongs to course/student
        // If Test is completed, return it plain
        // If Test is not completed, set all the alternative.correct to false before returning

        User student = userRepository.findByUsername(username);
        Course studentCourse = courseRepository.findByIdAndUsers(course_id, student);
        if(studentCourse == null) throw new CourseIdException("Course with id '" +course_id+ "' not found");

        Test test = testRepository.findByIdAndUserAndCourse(test_id, student, studentCourse);
        if(test == null) throw new TestIdException("Test with id '" +test_id+ "' not found");

        if(test.getCompleted() == false) {
            for(Question question: test.getQuestions()) {
                for(Alternative alternative: question.getAlternatives())
                    alternative.setCorrect(false);
            }
        }

        return test;
    }

    public Set<TestViewModel> getStudentTestListByCourse(Long course_id, Long student_id, String username) {

        // Make sure username and student_id are the same (the user is not requesting the list of another student_id)
        // Make sure student has a course with course_id
        // Map Set<Test> to Set<TestViewModel>

        User currentStudent = userRepository.findByUsername(username);
        if(currentStudent.getId() != student_id) throw new UserIdException("Invalid user_id");

        Course studentCourse = courseRepository.findByIdAndUsers(course_id, currentStudent);
        if(studentCourse == null) throw new CourseIdException("Course with id '" +course_id+ "' not found");

        Set<Test> studentCourseTests = testRepository.findAllByCourseAndUser(studentCourse, currentStudent);
        Set<TestViewModel> studentCourseTestList = new HashSet<>();

        for(Test test: studentCourseTests) {
            TestViewModel testViewModel = new TestViewModel();
            testViewModel.setId(test.getId());
            testViewModel.setHeader(test.getHeader());
            testViewModel.setCompleted(test.getCompleted());
            testViewModel.setPassed(test.getPassed());

            studentCourseTestList.add(testViewModel);
        }

        return studentCourseTestList;
    }

    public Set<Test> getStudentCompletedTestListByCourse(Long course_id, Long student_id, String username) {

        // Make sure user(teacher) has a course with course_id
        // Make sure there is a student with student_id in the course

        User teacher = userRepository.findByUsername(username);
        Course course = courseRepository.findByIdAndUsers(course_id, teacher);
        if(course == null) throw new CourseIdException("Course with id '" +course_id+ "' not found");

        User student = userRepository.findByIdAndRoleAndCourses(student_id, "STUDENT", course);
        if(student == null) throw new UserIdException("Student with id '" +student_id+ "' not found in this course");

        Set<Test> studentCourseCompletedTests = testRepository.findAllByUserAndCourseAndCompleted(student, course, true);
        return studentCourseCompletedTests;
    }

    public void evaluateTest(Long course_id, Long test_id, Test postTest, String username) {

        // Make sure course exists and belongs to user
        // Make sure test exists and belongs to course
        // Check if existing test is already completed

        User student = userRepository.findByUsername(username);
        Course studentCourse = courseRepository.findByIdAndUsers(course_id, student);
        if(studentCourse == null) throw new CourseIdException("Course with id '" +course_id+ "' not found");

        Test test = testRepository.findByIdAndUserAndCourse(test_id, student, studentCourse);
        if(test == null) throw new TestIdException("Test with id '" +test_id+ "' not found");
        if(test.getCompleted() == true) throw new TestIdException("Test with id '" +test_id+ "' is already completed.");

        Integer correctAnswers = 0;

        for(Question postQuestion: postTest.getQuestions()) {

            Boolean error = false;
            for(Alternative postAlternative: postQuestion.getAlternatives()) {

                Alternative alternative = alternativeRepository.getById(postAlternative.getId());
                alternative.setChecked(postAlternative.getChecked());
                alternativeRepository.save(alternative);

                if(alternative.getChecked() != alternative.getCorrect())
                    error = true;
            }
            if(!error)
                correctAnswers++;
        }

        test.setScored_points(correctAnswers);
        double resultPercent = (double) correctAnswers/test.getTotal_points();

        if(resultPercent < 0.4)
            test.setPassed(false);
        else
            test.setPassed(true);
        test.setCompleted(true);
        test.setCompleted_time(new Date());

        testRepository.save(test);
    }
}
