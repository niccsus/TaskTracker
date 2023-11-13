package com.rmrfroot.tasktracker222.validations;

import com.rmrfroot.tasktracker222.entities.Drill;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.ArrayList;
import java.util.Set;
import java.util.Calendar;
import java.util.Date;


public class ValidateDrillTest {

    Calendar calendar = Calendar.getInstance();
    Date date1 = new Date(calendar.getTimeInMillis());
    Date date2 = new Date(calendar.getTimeInMillis());
    Date date3 = new Date(calendar.getTimeInMillis());
    ArrayList<String> participants;

    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    Validator validator = factory.getValidator();

    private Drill testDrill = new Drill("Test Drill",date1,date2,date3,"Sacramento",4321,
            "description",participants);

    @Test
    void getId(){
        testDrill.getId();
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }

    @ParameterizedTest
    @ValueSource(ints = {-1,0,1234,4321,1000000000})
    void setId(int input){
        testDrill.setId(input);
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }

    @Test
    void getDrillTitle() {
        testDrill.getTitle();
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }

    @ParameterizedTest
    @ValueSource (strings = {"New Test Drill",""," "})
    void setDrillTitle(String input) {
        testDrill.setTitle(input);
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }

    @Test
    void getDrillDate() {
        testDrill.getDate();
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }

    @Test
    void setDrillDate(){
        Date newDate=new Date(calendar.getTimeInMillis());
        testDrill.setDate(newDate);
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }

    @Test
    void getDrillStartTime() {
        testDrill.getStartTime();
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }

    @Test
    void setDrillStartTime() {
        Date newDate=new Date(calendar.getTimeInMillis());
        testDrill.setStartTime(newDate);
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }

    @Test
    void getDrillEndTime(){
        testDrill.getEndTime();
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }

    @Test
    void setDrillEndTime() {
        Date newDate=new Date(calendar.getTimeInMillis());
        testDrill.setEndTime(newDate);
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }

    @Test
    void getLocation() {
        testDrill.getLocation();
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }

    @ParameterizedTest
    @ValueSource (strings = {""," ","Outside","Inside"})
    void setLocation(String input) {
        testDrill.setLocation(input);
        Set<ConstraintViolation<Drill>> violations = validator.validate(testDrill);

        for (ConstraintViolation<Drill> violation : violations) {
            System.out.println(violation.getMessage());
        }
    }


//    public String getOfficer_email() {
//        return officer_email;
//    }
//
//    public void setOfficer_email(String officer_email) {
//        this.officer_email = officer_email;
//    }
//
//    public String getNote() {
//        return note;
//    }
//
//    public void setNote(String note) {
//        this.note = note;
//    }
//
//    public String getAdmin_name() {
//        return admin_name;
//    }
//
//    public void setAdmin_name(String admin_name) {
//        this.admin_name = admin_name;
//    }
//
//    public String getCreated_timestamp() {
//        return created_timestamp;
//    }
//
//    public void setCreated_timestamp(String created_timestamp) {
//        this.created_timestamp = created_timestamp;
//    }

}
