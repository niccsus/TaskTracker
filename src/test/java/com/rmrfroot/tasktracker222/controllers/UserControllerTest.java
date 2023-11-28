package com.rmrfroot.tasktracker222.controllers;

import com.rmrfroot.tasktracker222.entities.User;
import com.rmrfroot.tasktracker222.configurers.Auth;
import com.rmrfroot.tasktracker222.dao.UsersDao;
import com.rmrfroot.tasktracker222.entities.User;
import com.rmrfroot.tasktracker222.services.UsersDaoService;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(UserController.class)
class UserControllerTest extends Auth {

    @MockBean
    private UsersDaoService usersDaoService;

    @Autowired
    private WebApplicationContext webApplicationContext;
    @MockBean
    UsersDao usersDao;
    @MockBean
    UserController userController;
    @Autowired
    MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }


    int stat=401;
    private java.util.ArrayList<String> teamList =new ArrayList<>(Arrays.asList("team1", "team2"));
    private java.util.ArrayList<String> teamList2 =new ArrayList<>(Arrays.asList("222All"));


    User testUser = new User("user1",
            "$2a$10$KAiL9OPVWOvQvozrS0mUy.u5cFCHe2HtO7oPy/5rEJPUhLCStPuXu", "John", "Doe",
            "h@gmail.com", "i@gmail.com", "", "", "AB",
            "SCOP", "SCO1", teamList2);

    @Test
    void getUsersCollection() throws Exception {

        when(usersDaoService.findAll()).thenReturn(List.of(new User("brianfrey", "Brian", "Frey",
                "root@gov.com","email@root.edu","email@root.edu",
                "9165555555","1234", "Captain",
                "workCenter","flight",teamList)));

        this.mockMvc.perform(MockMvcRequestBuilders.get("/users"))
                //.andExpect(MockMvcResultMatchers.jsonPath("$.size()", Matchers.is(1)))
                .andExpect(status().isUnauthorized());
    }

    @WithMockUser(username = "admin",roles={"USER","ADMIN"})
    @Test
    void userEditSubmit() throws Exception{

        int id = 1;
        User user = new User("old.user", "password", "old",
                "user","email@root.edu","email@root.edu",
                "9165555555","1234", "Captain",
                "workCenter","flight",teamList);
        user.setId(1);
        User updatedUser = new User("new.user", "pa$$w0rd", "new",
                "user","email@root.edu","email@root.edu",
                "9165555555","1234", "Captain",
                "workCenter","flight",teamList2);
        updatedUser.setId(2);

        given(usersDaoService.findUsersById(2)).willReturn((updatedUser));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/user-manager")).andReturn();
        assertTrue(stat==result.getResponse().getStatus());
    }

    @WithMockUser(username = "admin",roles={"USER","ADMIN"})
    @Test
    void userEditDelete() throws Exception {
        //userEditRequest.setId(String.valueOf(1));
        //this.mockMvc.perform(MockMvcRequestBuilders.post("/users")).andExpect(redirectedUrl("/users"));
        //this.mockMvc.perform(MockMvcRequestBuilders.post("/users")).andExpect(redirectedUrl("http://localhost:8080/login/oauth2/code/cognito"));
    }

    @Test
    void findById() throws Exception{
        when(usersDaoService.findUsersById(44)).thenReturn((testUser));

        this.mockMvc.perform(MockMvcRequestBuilders.get("/users"));
    }

    @Test
    void accessControl() {
    }

    @Test
    void addUser() {
    }

    @WithMockUser("pcbalf")
    @Test
    void saveUser() throws  Exception{
        RequestBuilder request=MockMvcRequestBuilders.post("/register-new-user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testUser.getJson());
        MvcResult result = mockMvc.perform(request).andReturn();
        assertEquals(status().isOk(),result.getResponse().getStatus());
    }

    @Test
    void updateUser() {


    }


    @Test
    @WithMockUser(username = "admin",roles={"USER","ADMIN"})
    void deleteUserById() throws Exception {

        int id = 1;
        User user = new User("brianfrey", "Brian", "Frey",
                "root@gov.com","email@root.edu","email@root.edu",
                "9165555555","1234", "Captain",
                "workCenter","flight",teamList);
        user.setId(1);
        given(usersDaoService.findUsersById(id)).willReturn((user));
        doNothing().when(usersDaoService).deleteById(user.getId());

        this.mockMvc.perform(delete("/api/users/{id}", user.getId()))
                .andExpect(status().isForbidden());
    }

    @Test
    void userManager() throws Exception {
        RequestBuilder request=MockMvcRequestBuilders.get("/user-manager");
        MvcResult result=mockMvc.perform(request).andReturn();
        System.out.println(result.getResponse().getStatus());
        assertTrue(stat==result.getResponse().getStatus());
    }

    @Test
    void pendingApproval() {
    }
}