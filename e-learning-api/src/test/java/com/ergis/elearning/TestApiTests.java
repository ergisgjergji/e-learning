package com.ergis.elearning;

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

import static org.junit.Assert.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TestApiTests {

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
    @WithMockUser(username = "student1@test.com", roles = "STUDENT")
    public void test1_getStudentTestListByCourse() throws Exception {

        // There is no course with id: 0
        MvcResult result1 = mockMvc
                .perform(get("/api/test/0/list").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // User has no course with id: 2
        MvcResult result2 = mockMvc
                .perform(get("/api/test/2/list").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Good request
        MvcResult result3 = mockMvc
                .perform(get("/api/test/1/list").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
        assertEquals(200, result3.getResponse().getStatus());
    }

    @Test
    @WithMockUser(username = "student1@test.com", roles = "STUDENT")
    public void test2_getTestById() throws Exception {

        // There is no course with id: 0
        MvcResult result1 = mockMvc
                .perform(get("/api/test/0/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // User has no course with id: 2
        MvcResult result2 = mockMvc
                .perform(get("/api/test/2/list").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Course has no Test with id: 0
        MvcResult result3 = mockMvc
                .perform(get("/api/test/1/0").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Good request
        MvcResult result4 = mockMvc
                .perform(get("/api/test/1/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
        assertEquals(400, result3.getResponse().getStatus());
        assertEquals(200, result4.getResponse().getStatus());
    }

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test3_getStudentCompletedTestListByCourse() throws Exception {

        // There is no course with id: 0
        MvcResult result1 = mockMvc
                .perform(get("/api/test/0/4/completed").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // User has no course with id: 2
        MvcResult result2 = mockMvc
                .perform(get("/api/test/2/4/completed").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Course with id: 1 has no registered student with id: 0
        MvcResult result3 = mockMvc
                .perform(get("/api/test/1/0/completed").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Good request
        MvcResult result4 = mockMvc
                .perform(get("/api/test/1/4/completed").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
        assertEquals(400, result3.getResponse().getStatus());
        assertEquals(200, result4.getResponse().getStatus());
    }
}
