package com.rmrfroot.tasktracker222.services;

import com.rmrfroot.tasktracker222.dao.DrillDAO;
import com.rmrfroot.tasktracker222.entities.Drill;
import org.junit.BeforeClass;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.junit.jupiter.api.Assertions.*;

class DrillDaoImplTest {
    private static AnnotationConfigApplicationContext context;
    private static DrillDAO drillDAO = null;
    private static UsersDaoService usersDao = null;

    @BeforeClass
    public static void init() {
        context = new AnnotationConfigApplicationContext();
        context.scan("com.rmrfroot.tasktracker222");
        context.refresh();
        drillDAO = (DrillDAO)context.getBean("drillDAO");
        usersDao = (UsersDaoService)context.getBean("usersDAO");

    }

    @Test
    void findAll() {
    }

    @Test
    void findById() {
    }

    @Test
    void save() {
    }

    @Test
    void deleteById() {
    }

    @Test
    void update() {
    }

    @Test
    void findDrillsInWeekOfDate() {
    }

    @Test
    void findDrillsInWeekOfDateByID() {
    }

    @Test
    void findStartOfWeek() {
    }

    @Test
    void findEndOfWeek() {
    }

    @Test
    void findDatesForScheduleByDate() {
    }

    @Test
    void convertStringToLocalDate() {
    }

    @Test
    void convertDateToString() {
    }

    @Test
    void getLocalDateOfDrill() {
    }

    @Test
    void convertDateToLocalDate() {
    }

    @Test
    void combineDateAndTime() {
    }

    @Test
    void getDaysOfWeekWithConcurrency() {
    }

    @Test
    void getDrillConcurrencyMap() {
    }

    @Test
    void findConcurrencyInDay() {
    }

    @Test
    void sortDrillsByDayOfWeek() {
    }
}