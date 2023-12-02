package com.rmrfroot.tasktracker222.entities;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GroupTest {

    @Test
    void testGetRanks() {
        String[] ranks = Group.getRanks();
        assertNotNull(ranks);
    }

    @Test
    void testGetWorkcenters() {
        String[] workcenters = Group.getWorkcenters();
        assertNotNull(workcenters);
    }

    @Test
    void testGetFlights() {
        String[] flights = Group.getFlights();
        assertNotNull(flights);
    }

    @Test
    void testGetTeams() {
        String[] teams = Group.getTeams();
        assertNotNull(teams);
    }

    @Test
    void testGetLocations() {
        String[] locations = Group.getLocations();
        assertNotNull(locations);
    }
}