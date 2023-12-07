package com.rmrfroot.tasktracker222.services;
import com.rmrfroot.tasktracker222.Repository.UserRepository;
import com.rmrfroot.tasktracker222.entities.User;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UsersDaoServiceImplTests {

    @InjectMocks
    //UsersDaoServiceImpl service = new UsersDaoServiceImpl();
    UsersDaoServiceImpl service;
    @Mock
    //UsersDAOImpl dao = new UsersDAOImpl();
    UserRepository dao;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    public void testFindAll() {
        MockitoAnnotations.openMocks(this);
        List<User> list = new ArrayList<User>();
        ArrayList<String> testTeam = new ArrayList<>();
        User userOne = new User("test.user", "123456", "user", "one", "mil@gmail.com", "civ@gmail.com",
                "1231234","202", "AB", "SCOP", "CMD", testTeam);
        list.add(userOne);
        User userTwo = new User("test.user", "333444", "user", "two", "mil2@gmail.com", "civ2@gmail.com",
                "1326547","222", "Amn", "SCOX", "SC01", testTeam);
        list.add(userTwo);

        when(dao.findAll()).thenReturn(list);

        //List<User> all = new ArrayList<User>();
        List<User> serviceAll = service.findAll();
        //service.save(userOne);
        //service.save(userTwo);
        assertEquals(2, serviceAll.size());
        verify(dao, times(3)).findAll();
    }

    /*
    @Test
    public void testUpdate(){

    }

    @Test
    public void testDeleteByID(){

    }
    @Test
    public void testSave){

    }
    */
}

