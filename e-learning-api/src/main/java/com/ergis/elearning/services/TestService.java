package com.ergis.elearning.services;

import com.ergis.elearning.domain.*;
import com.ergis.elearning.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private UserService userService;

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
}
