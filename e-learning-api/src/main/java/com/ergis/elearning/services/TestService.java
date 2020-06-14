package com.ergis.elearning.services;

import com.ergis.elearning.domain.*;
import com.ergis.elearning.exceptions.CourseExceptions.CourseIdException;
import com.ergis.elearning.exceptions.QuestionBaseExceptions.QuestionBaseAlternativesException;
import com.ergis.elearning.exceptions.QuestionBaseExceptions.QuestionBaseTypeException;
import com.ergis.elearning.exceptions.TestBaseExceptions.TestBaseIdException;
import com.ergis.elearning.exceptions.TestBaseExceptions.TestBaseQuestionsException;
import com.ergis.elearning.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class TestService {

    @Autowired
    private ITestBaseRepository testBaseRepository;
    @Autowired
    private IQuestionBaseRepository questionBaseRepository;
    @Autowired
    private IAlternativeBaseRepository alternativeBaseRepository;
    @Autowired
    private ICourseRepository courseRepository;
    @Autowired
    private IUserRepository userRepository;

    // Logic for test validation
    private Boolean isTestValid(TestBase testBase) {

        if(testBase.getQuestions().size() == 0) throw new TestBaseQuestionsException("Test must contain some questions");

        for(QuestionBase question: testBase.getQuestions()) {
            Integer type = question.getType();

            if(type == null) throw new QuestionBaseTypeException("Question type is required");
            if(!(type >= 1 && question.getType() <= 3)) throw new QuestionBaseTypeException("Invalid question type");
            if(question.getAlternatives().size() == 0) throw new QuestionBaseAlternativesException("Question must contain some alternatives");

            if(type == 1 && question.getAlternatives().size() != 2) throw new QuestionBaseAlternativesException("'Yes/No' question must have only 2 alternatives");
            if(type == 2 && question.getAlternatives().size() != 4) throw new QuestionBaseAlternativesException("'Single choice' question must have 4 alternatives");
            if(type == 3 && question.getAlternatives().size() != 4) throw new QuestionBaseAlternativesException("'Multi-choice' question must have 4 alternatives");

            Integer correct = 0;

            for(AlternativeBase alternative: question.getAlternatives()) {
                if(alternative.getCorrect() == true) correct++;
            }

            if(type == 1 && correct != 1) throw new QuestionBaseAlternativesException("'Yes/No' question must have 1 correct answer");
            if(type == 2 && correct != 1) throw new QuestionBaseAlternativesException("'Single choice' question must have 1 correct answer");
            if(type == 3 && correct != 2) throw new QuestionBaseAlternativesException("'Multi-choice' question must have 2 correct answer");
        }

        return true;
    }

    public TestBase create(TestBase testBase, Long course_id, String username) {

        User user = userRepository.findByUsername(username);
        Course course = courseRepository.findByIdAndUsers(course_id, user);
        if(course == null) throw new CourseIdException("Course with id '" +course_id+ "' not found");

        if(this.isTestValid(testBase)) {

            testBase.setCourse(course);
            testBaseRepository.save(testBase);
            for (QuestionBase question : testBase.getQuestions()) {
                question.setTest(testBase);
                questionBaseRepository.save(question);

                for (AlternativeBase alternative : question.getAlternatives()) {
                    alternative.setQuestion(question);
                    alternativeBaseRepository.save(alternative);
                }
            }
        }

        return testBase;
    }

    public Set<TestBase> findAllByCourse(Long course_id, String username) {

        User user = userRepository.findByUsername(username);
        Course course = courseRepository.findByIdAndUsers(course_id, user);
        if(course == null) throw new CourseIdException("Course with id '" +course_id+ "' not found");

        return testBaseRepository.findAllByCourse(course);
    }

    public void delete(Long course_id, Long testbase_id, String username) {

        User user = userRepository.findByUsername(username);

        Course course = courseRepository.findByIdAndUsers(course_id, user);
        if(course == null) throw new CourseIdException("Course with id '" +course_id+ "' not found");

        TestBase testBase = testBaseRepository.findByIdAndCourse(testbase_id, course);
        if(testBase == null) throw new TestBaseIdException("Test with id '" +testbase_id+ "' not found");

        testBaseRepository.delete(testBase);
    }
}
