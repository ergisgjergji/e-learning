package com.ergis.elearning;

import com.ergis.elearning.domain.Question;
import com.ergis.elearning.domain.TestBase;
import com.ergis.elearning.domain.QuestionBase;
import com.ergis.elearning.domain.AlternativeBase;
import com.ergis.elearning.repositories.ICourseRepository;
import com.ergis.elearning.repositories.ITestBaseRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TestBaseApiTests {

    /*
		NOTE: There are two methods to test the secured APIs.
		- @WithMockUser(username = "", roles = "")
		- Mock a principal and pass it down to the RequestBuilder (which performs the MVC call)
	*/

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private ICourseRepository courseRepository;

    @Autowired
    private ITestBaseRepository testBaseRepository;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
    }

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test1_getAllCourseTests() throws Exception {

        // There is no course with id: 0
        MvcResult result1 = mockMvc
                .perform(get("/api/testbase/0/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Course with id: 2 does not belong to this user
        MvcResult result2 = mockMvc
                .perform(get("/api/testbase/2/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Good request
        MvcResult result3 = mockMvc
                .perform(get("/api/testbase/1/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
        assertEquals(200, result3.getResponse().getStatus());
    }

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test2_createTest() throws Exception {

        TestBase test1 = new TestBase("Teza X");
        TestBase test2 = new TestBase("Teza X");
        TestBase test3 = new TestBase("Teza X");
        TestBase test4 = new TestBase("Teza X");
        TestBase test5 = new TestBase("Teza X");
        // Empty test (with no questions)
        TestBase test6 = new TestBase("Teza X");

        // Invalid question type
        ArrayList<QuestionBase> questions1 = new ArrayList<>();
        questions1.add(new QuestionBase("Pyetje", 4));

        // Question must contain some alternatives
        ArrayList<QuestionBase> questions2 = new ArrayList<>();
        questions2.add(new QuestionBase("Pyetje", 1));

        // Yes/No question must have 2 alternatives (not more or less)
        ArrayList<QuestionBase> questions3 = new ArrayList<>();
        questions3.add(new QuestionBase("Pyetje", 1));

        Set<AlternativeBase> alternatives1 = new HashSet<>();
        alternatives1.add(new AlternativeBase("Yes", true));
        alternatives1.add(new AlternativeBase("No", false));
        alternatives1.add(new AlternativeBase("3rd alternative in a yes/no question", false));
        questions1.get(0).setAlternatives(alternatives1);

        // Yes/No question must have 1 correct answer (not more or less)
        ArrayList<QuestionBase> questions4 = new ArrayList<>();
        questions4.add(new QuestionBase("Pyetje", 1));

        Set<AlternativeBase> alternatives2 = new HashSet<>();
        alternatives2.add(new AlternativeBase("Yes", false));
        alternatives2.add(new AlternativeBase("No", false));
        questions4.get(0).setAlternatives(alternatives2);

        // Good request
        ArrayList<QuestionBase> questions5 = new ArrayList<>();
        questions5.add(new QuestionBase("Pyetje", 1));

        Set<AlternativeBase> alternatives3 = new HashSet<>();
        alternatives3.add(new AlternativeBase("Yes", true));
        alternatives3.add(new AlternativeBase("No", false));
        questions5.get(0).setAlternatives(alternatives3);

        test1.setQuestions(new HashSet<QuestionBase>(questions1));
        test2.setQuestions(new HashSet<QuestionBase>(questions2));
        test3.setQuestions(new HashSet<QuestionBase>(questions3));
        test4.setQuestions(new HashSet<QuestionBase>(questions4));
        test5.setQuestions(new HashSet<QuestionBase>(questions5));

        String request1 = mapper.writeValueAsString(test1);
        String request2 = mapper.writeValueAsString(test2);
        String request3 = mapper.writeValueAsString(test3);
        String request4 = mapper.writeValueAsString(test4);
        String request5 = mapper.writeValueAsString(test5);
        String request6 = mapper.writeValueAsString(test6);

        // There is no course with id: 0
        MvcResult result1 = mockMvc
                .perform(post("/api/testbase/0").content(request1).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        MvcResult result2 = mockMvc
                .perform(post("/api/testbase/1").content(request1).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        MvcResult result3 = mockMvc
                .perform(post("/api/testbase/1").content(request2).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        MvcResult result4 = mockMvc
                .perform(post("/api/testbase/1").content(request3).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        MvcResult result5 = mockMvc
                .perform(post("/api/testbase/1").content(request4).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        MvcResult result6 = mockMvc
                .perform(post("/api/testbase/1").content(request5).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();

        MvcResult result7 = mockMvc
                .perform(post("/api/testbase/1").content(request6).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
        assertEquals(400, result3.getResponse().getStatus());
        assertEquals(400, result4.getResponse().getStatus());
        assertEquals(400, result5.getResponse().getStatus());
        assertEquals(201, result6.getResponse().getStatus());
        assertEquals(400, result7.getResponse().getStatus());
    }

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test3_deleteTest() throws Exception {

        // TestBase we already created in the test method above
        TestBase testBase = testBaseRepository.findByHeader("Teza X");

        // There is no course with id: 0
        MvcResult result1 = mockMvc
                .perform(delete("/api/testbase/0/" + testBase.getId()).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // There is no testbase with id: 0
        MvcResult result2 = mockMvc
                .perform(delete("/api/testbase/1/0").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Good request
        MvcResult result3 = mockMvc
                .perform(delete("/api/testbase/1/" + testBase.getId()).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
        assertEquals(200, result3.getResponse().getStatus());
    }
}
