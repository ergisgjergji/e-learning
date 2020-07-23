package com.ergis.elearning;

import static org.junit.Assert.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;

import com.ergis.elearning.ViewModel.ChangePasswordViewModel;
import com.ergis.elearning.domain.User;
import com.ergis.elearning.repositories.IUserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserApiTests {

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
	private IUserRepository userRepository;

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
	}

	// This test is only for demonstrating that the role-based Authorization works.
	@Test
	@WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
	public void test_getAllUsers_thenForbidden() throws Exception {

		MvcResult result = mockMvc
				.perform(get("/api/user/all").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isForbidden())
				.andReturn();

		assertEquals(403, result.getResponse().getStatus());
	}

	// This test is only for demonstrating that the Authentication works (you need to be logged-in to use most APIs)
	@Test
	public void test_getAllUsers_thenUnauthorized() throws Exception {

		MvcResult result = mockMvc
				.perform(get("/api/user/all").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isUnauthorized())
				.andReturn();

		assertEquals(401, result.getResponse().getStatus());
	}

	@Test
	@WithMockUser(username = "admin@admin.com", roles = "ADMIN")
	public void test_getAllUsers() throws Exception {

		MvcResult result = mockMvc
				.perform(get("/api/user/all").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();

		assertEquals(200, result.getResponse().getStatus());
	}

	@Test
	@WithMockUser(username = "admin@admin.com", roles = "ADMIN")
	public void test_getAllStudents() throws Exception {

		MvcResult result = mockMvc
				.perform(get("/api/user/students").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();

		assertEquals(200, result.getResponse().getStatus());
	}

	@Test
	@WithMockUser(username = "admin@admin.com", roles = "ADMIN")
	public void test_getAllTeachers() throws Exception {

		MvcResult result = mockMvc
				.perform(get("/api/user/teachers").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();

		assertEquals(200, result.getResponse().getStatus());
	}

	@Test
	@WithMockUser(username = "admin@admin.com", roles = "ADMIN")
	public void test_getUserById_thenOk() throws Exception {

		// Admin id = 1
		MvcResult result1 = mockMvc
				.perform(get("/api/user/1").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();

		// An admin can get any user by id, not only his id
		MvcResult result2 = mockMvc
				.perform(get("/api/user/2").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();

		assertEquals(200, result1.getResponse().getStatus());
		assertEquals(200, result2.getResponse().getStatus());
	}

	@Test
	@WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
	public void test_getUserById_thenBadRequest() throws Exception {

		// User doesn't exists return status: 400
		MvcResult result1 = mockMvc
				.perform(get("/api/user/323232").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		// If you are not an admin, you cannot get another user by id (only your id)
		MvcResult result2 = mockMvc
				.perform(get("/api/user/1").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		assertEquals(400, result1.getResponse().getStatus());
		assertEquals(400, result2.getResponse().getStatus());
	}

	@Test
	@WithMockUser(username = "admin@admin.com", roles = "ADMIN")
	public void test_createUser() throws Exception {
		Date now = new Date();

		User existingUser = new User("teacher1@test.com", "Mock 1","111111", "FTI", "TEACHER", now);
		User invalidRegistrationDate = new User("mock@test.com", "Mock", "111111", "FTI", "TEACHER", null);
		User invalidFaculty = new User("mock@test.com", "Mock", "111111", "FFF", "TEACHER", now);
		User invalidRole = new User("mock@test.com", "Mock", "111111", "FTI", "XX", now);
		User validUser = new User("mock@test.com", "Mock", "111111", "FTI", "TEACHER", now);

		String request1 = mapper.writeValueAsString(existingUser);
		String request2 = mapper.writeValueAsString(invalidRegistrationDate);
		String request3 = mapper.writeValueAsString(invalidFaculty);
		String request4 = mapper.writeValueAsString(invalidRole);
		String request5 = mapper.writeValueAsString(validUser);

		MvcResult result1 = mockMvc
				.perform(post("/api/user").content(request1).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		MvcResult result2 = mockMvc
				.perform(post("/api/user").content(request2).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		MvcResult result3 = mockMvc
				.perform(post("/api/user").content(request3).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		MvcResult result4 = mockMvc
				.perform(post("/api/user").content(request4).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		MvcResult result5 = mockMvc
				.perform(post("/api/user").content(request5).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated())
				.andReturn();

		assertEquals(400, result1.getResponse().getStatus());
		assertEquals(400, result2.getResponse().getStatus());
		assertEquals(400, result3.getResponse().getStatus());
		assertEquals(400, result4.getResponse().getStatus());
		assertEquals(201, result5.getResponse().getStatus());
	}

	@Test
	@WithMockUser(username = "admin@admin.com", roles = "ADMIN")
	public void test_deleteUser() throws Exception {

		User user = userRepository.findByUsername("mock@test.com");

		MvcResult result1 = mockMvc
				.perform(delete("/api/user/0").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		MvcResult result2 = mockMvc
				.perform(delete("/api/user/" + user.getId()).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();

		assertEquals(400, result1.getResponse().getStatus());
		assertEquals(200, result2.getResponse().getStatus());
	}

	@Test
	@WithMockUser(username = "teacher1@test.com", roles = "TEACHER")
	public void test_updateUser() throws Exception {

		// A non-admin user can only update his info (`id` must belong to him, otherwise throw `Bad request`)

		Date now = new Date();

		User currentUser = new User(2, "teacher1@test.com", "Updated name", "111111", "FTI", "TEACHER", now);
		User otherUser = new User(3, "teacher2@test.com", "Updated name", "111111", "FIE", "TEACHER", now);

		String request1 = mapper.writeValueAsString(currentUser);
		String request2 = mapper.writeValueAsString(otherUser);

		MvcResult result1 = mockMvc
				.perform(put("/api/user").content(request1).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();

		MvcResult result2 = mockMvc
				.perform(put("/api/user").content(request2).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		assertEquals(200, result1.getResponse().getStatus());
		assertEquals(400, result2.getResponse().getStatus());
	}

	@Test
	@WithMockUser(username = "admin@admin.com", roles = "ADMIN")
	public void test_updateUser_asAdmin() throws Exception {

		// An admin can update every user, not only himself

		Date now = new Date();

		User invalidId = new User(0, "teacher1@test.com", "Teacher 1", "111111", "FTI", "TEACHER", now);
		User duplicateUsername = new User(2, "teacher2@test.com", "Teacher 1", "111111", "FTI", "TEACHER", now);
		User validUser = new User(2, "teacher1@test.com", "Updated name", "111111", "FTI", "TEACHER", now);

		String request1 = mapper.writeValueAsString(invalidId);
		String request2 = mapper.writeValueAsString(duplicateUsername);
		String request3 = mapper.writeValueAsString(validUser);

		MvcResult result1 = mockMvc
				.perform(put("/api/user").content(request1).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		MvcResult result2 = mockMvc
				.perform(put("/api/user").content(request2).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		MvcResult result3 = mockMvc
				.perform(put("/api/user").content(request3).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();

		assertEquals(400, result1.getResponse().getStatus());
		assertEquals(400, result2.getResponse().getStatus());
		assertEquals(200, result3.getResponse().getStatus());
	}

	@Test
	@WithMockUser(username = "admin@admin.com", roles = "ADMIN")
	public void test_changePassword() throws Exception {

		ChangePasswordViewModel invalidId = new ChangePasswordViewModel(0, "111111", "111111");
		ChangePasswordViewModel invalidOldPassword = new ChangePasswordViewModel(1, "dfsdfsd", "111111");
		ChangePasswordViewModel shortPasswordLength = new ChangePasswordViewModel(1, "111111", "123");
		ChangePasswordViewModel validModel = new ChangePasswordViewModel(1, "111111", "111111");

		String request1 = mapper.writeValueAsString(invalidId);
		String request2 = mapper.writeValueAsString(invalidOldPassword);
		String request3 = mapper.writeValueAsString(shortPasswordLength);
		String request4 = mapper.writeValueAsString(validModel);

		MvcResult result1 = mockMvc
				.perform(post("/api/user/change-password").content(request1).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		MvcResult result2 = mockMvc
				.perform(post("/api/user/change-password").content(request2).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		MvcResult result3 = mockMvc
				.perform(post("/api/user/change-password").content(request3).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andReturn();

		MvcResult result4 = mockMvc
				.perform(post("/api/user/change-password").content(request4).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();

		assertEquals(400, result1.getResponse().getStatus());
		assertEquals(400, result2.getResponse().getStatus());
		assertEquals(400, result3.getResponse().getStatus());
		assertEquals(200, result4.getResponse().getStatus());
	}
}
