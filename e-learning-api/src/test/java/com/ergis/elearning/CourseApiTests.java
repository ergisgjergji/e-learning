package com.ergis.elearning;

import com.ergis.elearning.domain.Course;
import com.ergis.elearning.repositories.ICourseRepository;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class CourseApiTests {

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

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
    }

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test1_getAllCourses() throws Exception {

        MvcResult result = mockMvc
                .perform(get("/api/course/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(200, result.getResponse().getStatus());
    }

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test2_getCourseById() throws Exception {

        MvcResult result1 = mockMvc
                .perform(get("/api/course/0").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        MvcResult result2 = mockMvc
                .perform(get("/api/course/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(200, result2.getResponse().getStatus());
    }

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test3_updateCourse() throws Exception {

        // This course belongs to this user
        Course course1 = courseRepository.getById(new Long(1));
        course1.setDescription("Updated description");

        // This course does not belong to this user
        Course course2 = courseRepository.getById(new Long(2));

        String request1 = mapper.writeValueAsString(course1);
        String request2 = mapper.writeValueAsString(course2);

        MvcResult result1 = mockMvc
                .perform(put("/api/course").content(request1).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        MvcResult result2 = mockMvc
                .perform(put("/api/course").content(request2).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        assertEquals(200, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
    }

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test4_createCourse() throws Exception {

        // Name can't be blank/null
        Course course1 = new Course(null, "Mock description");
        // There already exists a course with this name
        Course course2 = new Course("Course 1", "Mock description");
        // Good request
        Course course3 = new Course("Mock name", "Mock description");

        String request1 = mapper.writeValueAsString(course1);
        String request2 = mapper.writeValueAsString(course2);
        String request3 = mapper.writeValueAsString(course3);

        MvcResult result1 = mockMvc
                .perform(post("/api/course").content(request1).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        MvcResult result2 = mockMvc
                .perform(post("/api/course").content(request2).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        MvcResult result3 = mockMvc
                .perform(post("/api/course").content(request3).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
        assertEquals(201, result3.getResponse().getStatus());
    }

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test5_deleteCourse() throws Exception {

        // The course we already created in the 'test create' above
        Course course = courseRepository.findByName("Mock name");

        // There is no course with id: 0
        MvcResult result1 = mockMvc
                .perform(delete("/api/course/0").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Course with id: 2 does not belong to this user
        MvcResult result2 = mockMvc
                .perform(delete("/api/course/2").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Good request
        MvcResult result3 = mockMvc
                .perform(delete("/api/course/" + course.getId()).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
        assertEquals(200, result3.getResponse().getStatus());
    }

    //#region ------------------------------------------ Course-Students -----------------------------------------------

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test6_getAllRegisteredStudents() throws Exception {

        // There is no course with id: 0
        MvcResult result1 = mockMvc
                .perform(get("/api/course/0/students/registered").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Course with id: 2 does not belong to this user
        MvcResult result2 = mockMvc
                .perform(get("/api/course/2/students/registered").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Good request
        MvcResult result3 = mockMvc
                .perform(get("/api/course/1/students/registered").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
        assertEquals(200, result3.getResponse().getStatus());
    }

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test7_addStudent() throws Exception {

        // There is no course with id: 0
        MvcResult result1 = mockMvc
                .perform(post("/api/course/0/students/5").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Course with id: 2 does not belong to this user
        MvcResult result2 = mockMvc
                .perform(post("/api/course/2/students/5").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // There is no student with id: 0
        MvcResult result3 = mockMvc
                .perform(post("/api/course/1/students/0").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Good request
        MvcResult result4 = mockMvc
                .perform(post("/api/course/1/students/5").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
        assertEquals(400, result3.getResponse().getStatus());
        assertEquals(200, result4.getResponse().getStatus());
    }

    @Test
    @WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
    public void test8_removeStudent() throws Exception {

        // There is no course with id: 0
        MvcResult result1 = mockMvc
                .perform(delete("/api/course/0/students/5").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Course with id: 2 does not belong to this user
        MvcResult result2 = mockMvc
                .perform(delete("/api/course/2/students/5").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // There is no student with id: 0
        MvcResult result3 = mockMvc
                .perform(delete("/api/course/1/students/0").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // There is no registered student with id: 5 in this course
        MvcResult result4 = mockMvc
                .perform(delete("/api/course/1/students/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Good request
        MvcResult result5 = mockMvc
                .perform(delete("/api/course/1/students/5").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(400, result1.getResponse().getStatus());
        assertEquals(400, result2.getResponse().getStatus());
        assertEquals(400, result3.getResponse().getStatus());
        assertEquals(400, result4.getResponse().getStatus());
        assertEquals(200, result5.getResponse().getStatus());
    }

    //#endregion
}

