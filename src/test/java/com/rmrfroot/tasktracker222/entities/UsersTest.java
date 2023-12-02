package com.rmrfroot.tasktracker222.entities;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class UsersTest {

    int id = 12345;

    String password= "password123";
    String fname = "Brian";
    String lname = "Frey";
    String milEmail = "bfrey@root.edu";
    String civEmail = "cil@gmail.com";
    String phoneNumber = "1234567";
    String officeNumber= "24";
    String rank = "Airman";
    String workCenter = "work center";
    String flight = "flight";
    ArrayList<String> teamList = new ArrayList<String>();
    String username = fname +"."+lname;

    private PasswordEncoder PasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    PasswordEncoder encoder=PasswordEncoder();


    User user = new User(username, encoder.encode(password),fname, lname,milEmail,civEmail,phoneNumber,officeNumber, rank, workCenter,
            flight, teamList);
    @Test
    void getUserId() {
        user.setId(id);
        assertEquals(id,user.getId());
    }

    @Test
    void setUserId() {
        user.setId(5432);
        assertEquals(5432,user.getId());
    }

    @Test
    void getFirstName() {
        assertEquals(fname,user.getFirstName());
    }

    @Test
    void setFirstName() {
        user.setFirstName("Bill");
        assertEquals("Bill",user.getFirstName());
    }

    @Test
    void getLastName() {
        assertEquals(lname,user.getLastName());
    }

    @Test
    void setLastName() {
        user.setLastName("Lee");
        assertEquals("Lee",user.getLastName());
    }

    @Test
    void isAdmin() {
        assertFalse(user.isAdmin());
    }

    @Test
    void setAdmin() {
        user.setAdmin(true);
        assertTrue(user.isAdmin());
    }

    @Test
    void getMilEmail() {
        assertEquals(milEmail,user.getMilitaryEmail());
    }

    @Test
    void setMilEmail() {
        String newEmail = new String("newuser@csus.edu");
        user.setMilitaryEmail(newEmail);
        assertEquals(newEmail,user.getMilitaryEmail());
    }

    @Test
    void getCivEmail() {
        assertEquals(milEmail,user.getMilitaryEmail());
    }

    @Test
    void setCivEmail() {
        String newEmail = new String("newuser@csus.edu");
        user.setCivilianEmail(newEmail);
        assertEquals(newEmail,user.getCivilianEmail());
    }

    @Test
    void getPhoneNumber(){
        assertEquals(phoneNumber,user.getPhoneNumber());
    }

    @Test
    void setPhoneNumber(){
        String newPhoneNumber = "2345678";
        user.setPhoneNumber(newPhoneNumber);
        assertEquals(newPhoneNumber,user.getPhoneNumber());
    }

    @Test
    void getUserRank() {
        assertEquals(rank,user.getRank());
    }

    @Test
    void setUserRank() {
        user.setRank("General");
        assertEquals("General",user.getRank());
    }

    @Test
    void getUserWorkCenter() {
        assertEquals(workCenter,user.getWorkCenter());
    }

    @Test
    void setUserWorkCenter() {
        user.setWorkCenter("Cool Center");
        assertEquals("Cool Center",user.getWorkCenter());
    }

    @Test
    void getUserFlight() {
        assertEquals(flight,user.getFlight());
    }

    @Test
    void setUserFlight() {
        user.setFlight("Elite Flight");
        assertEquals("Elite Flight",user.getFlight());
    }

    @Test
    void getUsersTeams(){
        assertEquals(teamList,user.getTeams());
    }

    @Test
    void setUsersTeams(){
        ArrayList<String> newTeamList=new ArrayList<String>(Arrays.asList("222All"));
        user.setTeams(newTeamList);
        assertEquals(newTeamList,user.getTeams());
    }
}