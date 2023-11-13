package com.rmrfroot.tasktracker222.entities;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

class DrillTest {

    //Jira issue number DT129
    //Junit tests for Drill class
    int id = 1234;
    String title = "Captain";
    Calendar calendar = Calendar.getInstance();
    Date date = new Date(calendar.getTimeInMillis());
    Date startDate = new Date(calendar.getTimeInMillis());
    Date deadlineDate = new Date(calendar.getTimeInMillis());
    String location = "Sacto";
    int officerId= 24;

    ArrayList<String> participants;
    String note = "noted";
    Drill testDrill = new Drill(title,date,startDate,deadlineDate,location,officerId,note,participants);

    @Test
    void setId() {
        testDrill.setId(id);
        assertEquals(id,testDrill.getId());
    }

    @Test
    void setTitle() {
        testDrill.setTitle("Major");
        assertEquals("Major",testDrill.getTitle());
    }

    @Test
    void setStartDate() {
        testDrill.setStartTime(startDate);
        assertEquals(startDate,testDrill.getStartTime());
    }

    @Test
    void setDeadlineDate() {
        testDrill.setEndTime(deadlineDate);
        assertEquals(deadlineDate,testDrill.getEndTime());
    }

    @Test
    void setLocation() {
        testDrill.setLocation(location);
        assertEquals(location,testDrill.getLocation());
    }

    @Test
    void setReportToID() {
        testDrill.setReportToID(officerId);
        assertEquals(officerId,testDrill.getReportToID());
    }


    @Test
    void setDescription() {
        testDrill.setDescription(note);
        assertEquals(note,testDrill.getDescription());
    }

    @Test
    void setParticipants(){
        testDrill.setParticipants(participants);
        assertEquals(participants,testDrill.getParticipants());
    }

    @Test
    void getId() {
        testDrill.setId(2222);
        assertEquals(2222,testDrill.getId());
    }

    @Test
    void getTitle() {
        testDrill.setTitle(title);
        assertEquals(title,testDrill.getTitle());
    }

    @Test
    void getStartDate() {
        assertEquals(startDate,testDrill.getStartTime());
    }

    @Test
    void getDeadlineDate() {
        assertEquals(deadlineDate,testDrill.getEndTime());
    }

    @Test
    void getLocation() {
        assertEquals(location,testDrill.getLocation());
    }

    @Test
    void getReportToID() {
        assertEquals(officerId,testDrill.getReportToID());
    }


    @Test
    void getDescription() {
        assertEquals(note,testDrill.getDescription());
    }

    @Test
    void getParticipants(){
        assertEquals(participants,testDrill.getParticipants());
    }
}