package com.rmrfroot.tasktracker222.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vladmihalcea.hibernate.type.array.ListArrayType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;

//import java.time.LocalDate;
import java.io.File;
import java.io.FileNotFoundException;
import java.sql.Timestamp;
import java.util.*;
import java.util.regex.Pattern;

/**
 * User class
 * @author Anish
 * @author Noel
 * @author Visoth
 */
@Entity
@Table(name = "users")
@TypeDef(
        name = "team",
        typeClass = ListArrayType.class
)
public class User implements UserDetails, Comparable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "admin")
    private boolean admin;

    @Column(name = "needs_password_reset")
    private Boolean needsPasswordReset;

    @Column(name = "approved")
    private boolean approved;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "mil_email")
    private String militaryEmail;

    @Column(name = "civ_email")
    private String civilianEmail;


    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "office_number")
    private String officeNumber;

    @Column(name = "rank")
    private String rank;

    @Column(name = "work_center")
    private String workCenter;

    @Column(name = "flight")
    private String flight;


    @Type(type = "team")
    @Column(name = "teams", columnDefinition = "text[]")
    private ArrayList<String> teams;


    /**
     * Joining tables many to many
     */
    @JsonIgnore
    @ManyToMany(
            fetch=FetchType.LAZY,
            cascade = {CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.DETACH,
                    CascadeType.REFRESH
            })
    @JoinTable(
            name="users_drill_schedule",
            joinColumns =@JoinColumn(name="users_id"),
            inverseJoinColumns = @JoinColumn(name="drill_schedule_id")
    )

    private static final String TEAM_LIST_FILENAME = "team.txt";

    public User() {

    }

    /**
     * Creates User with all its attribute
     * @param username User's username to login
     * @param firstName User's first name
     * @param lastName User's last name
     * @param militaryEmail User's military email (ie. .mil)
     * @param civilianEmail User's civilian email (ie. gmail, yahoo, ...)

     * @param phoneNumber User's phone number
     * @param officeNumber User's office phone number
     * @param rank User's rank
     * @param workCenter User's work center
     * @param flight User's flight number
     * @param teams List of team the user is a part of
     */
    public User(String username,String password, String firstName, String lastName, String militaryEmail, String civilianEmail,
                String phoneNumber, String officeNumber, String rank, String workCenter,
                String flight, ArrayList<String> teams) {
        this.username = username;
        this.firstName = firstName;
        this.password=password;
        this.lastName = lastName;
        this.militaryEmail = militaryEmail;
        this.civilianEmail = civilianEmail;
        this.phoneNumber = phoneNumber;
        this.officeNumber = officeNumber;
        this.rank = rank;
        this.workCenter = workCenter;
        this.flight = flight;
        this.teams = teams;
        this.admin = false;
    }

    public int compareTo(User comparedUser){
        return this.getFirstName().compareTo(comparedUser.getFirstName());
    }

    /**
     * Get user id
     * @return user id
     */
    public int getId() {
        return id;
    }

    /**
     * Sets user id
     * @param id int containing user id
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * email validation using regular expression
     * @param emailAddrToValidate check to see if the email matches the pattern
     * @param emailValidationRegex check to see if the email matches the pattern
     */
    public static boolean isValidEmailAddrRegex(String emailValidationRegex, String emailAddrToValidate) {
        return Pattern.matches(emailValidationRegex, emailAddrToValidate);
    }

    /**
     * Get civilian email for user
     * @return user civilian email
     */
    public String getCivilianEmail() {
        return civilianEmail;
    }

    /**
     * Set user civilian email
     * @param civilianEmail string containing valid email address
     * @throws IllegalArgumentException email has to fulfill email requirements or else it won't take the email
     */
    public void setCivilianEmail(String civilianEmail) {
        String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        if(isValidEmailAddrRegex(regexPattern, civilianEmail)) {
            this.civilianEmail = civilianEmail;
        }
        else {
            throw new IllegalArgumentException("Not a valid email");
        }
    }

    /**
     * Get military email for user
     * @return user military email
     */
    public String getMilitaryEmail() {
        return militaryEmail;
    }

    /**
     * Set user military email
     * @param militaryEmail string containing valid email address
     * @throws IllegalArgumentException email has to fulfill email requirements or else it won't take the email
     */
    public void setMilitaryEmail(String militaryEmail) {
        String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        if(isValidEmailAddrRegex(regexPattern, militaryEmail) || militaryEmail.isBlank()) {
            this.militaryEmail = militaryEmail;
        }
        else {
            throw new IllegalArgumentException("Not a valid email");
        }
    }

    /**
     * Get user's first name
     * @return user's first name
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Set User's first name
     * @param firstName string containing user's first name
     * @throws IllegalArgumentException throws illegal argument exception if first name doesn't fulfill requirements
     */
    public void setFirstName(String firstName) {
        if(firstName.matches("[a-zA-Z]+")) {
            this.firstName = firstName;
        }
        else {
            throw new IllegalArgumentException("Not a valid name. First name should only contain letters");
        }
    }
    /**
     * Get user's last name
     * @return user's last name
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Set User's last name
     * @param lastName string containing user's first name
     * @throws IllegalArgumentException throws illegal argument exception if last name doesn't fulfill requirements
     */
    public void setLastName(String lastName) {
        if(lastName.matches("[a-zA-Z]+")) {
            this.lastName = lastName;
        }
        else {
            throw new IllegalArgumentException("Not a valid name. Last name should only contain letters");
        }
    }


    /**
     * Get user registration date
     * @return users registration date
     */

//    public String getRegister_date() {
//        return register_date;
//}

    /**
     * Set users registration date
     * @param register_date string containing registration date
     * @throws IllegalArgumentException if date is not in valid format, MM/DD/YYYY
     */
//    public void setRegister_date(String register_date) {
//        still working to fix this to work properly
//        String datePattern = "\\d{1,2}-\\d{1,2}-\\d{4}";
//        if (register_date.matches(datePattern)) {
//            this.register_date = register_date;
//        }
//        else {
//            throw new IllegalArgumentException("Register date must be MM/DD/YYYY. Not a valid date.");
//        }
//        this.register_date = register_date;
//   }
    /**
     * Get user's password status
     * @return user's rank
     */
    public Boolean NeedsPasswordReset() {
        return needsPasswordReset;
    }
    /**
     * Set User's password status
     */
    public void setNeedsPasswordReset(boolean needsPasswordReset) {
        this.needsPasswordReset = needsPasswordReset;
    }

    /**
     * Set users update date
     * @param update_date string containing update date
     * @throws IllegalArgumentException if date is not in valid format, MM/DD/YYYY
     */
//    public void setUpdate_date(String update_date) {
//        still working to fix this to work properly
//        String datePattern = "\\d{1,2}-\\d{1,2}-\\d{4}";
//        if (update_date.matches(datePattern)) {
//            this.update_date = update_date;
//        }
//        else {
//            throw new IllegalArgumentException("Update date must be MM/DD/YYYY. Not a valid date.");
//        }
//        this.update_date = update_date;
//    }

    /**
     * Get user's rank
     * @return user's rank
     */
    public String getRank() {
        return rank;
    }

    public void setRank(String rank){
        this.rank = rank;
    }

    /**
     * Gets user's work center
     * @return user's work center
     */
    public String getWorkCenter() {
        return workCenter;
    }

    public void setWorkCenter(String workCenter) {
        this.workCenter = workCenter;
    }

    /**
     * Gets user's flight
     * @return user's flight
     */
    public String getFlight() {
        return flight;
    }

    public void setFlight(String flight){
        this.flight = flight;
    }


//    public ArrayList<String> getTeamList() {
//        return teamList;
//    }
//


//    public void setTeamList(ArrayList<String> teamList) {
//        this.teamList = teamList;
//    }

//    public String getTeam() {
//        return team;
//    }
//    public void setTeam(String team) throws FileNotFoundException {
//        File fileText = new File("team.txt");
//        Scanner s = new Scanner(fileText);
//        int t = 0;
//
//        while(s.hasNextLine()){
//            if(team.equals(s.nextLine().trim())){
//                t += 1;
//            }
//        }
//        if (t <= 1) {
//            this.team = team;
//        }
//        else {
//            throw new IllegalArgumentException("Not a valid team.");
//        }
//    }

    public static void addTeam() {
        Scanner s = new Scanner(System.in);
        String teams = s.nextLine();
        ArrayList<String> list = new ArrayList<>(Arrays.asList(teams.split("\\s*,\\s*")));
        Set<String> aSet = new HashSet<>(list);
        list.add(String.valueOf(aSet));
    }

    //not used yet, ready to implement when needed
    //    random uuid
    private static void generateUUID() {
        UUID uuid = UUID.randomUUID();
    }

    /**
     * this functions reads users group from a text file
     * @param file read user's groups from a file
     * @return user's groups
     */

    //figured out a way to read user groups from text file, but not sure
    //how to implement to the project.
    //    public static void main (String[] args) {
//        String[] words = readGroup("group.txt");
//        for (int i = 0; i < words.length; i = i + 1){
//            System.out.println(words[i]);
//        }
//        System. out.println(Arrays.toString(words));
//    }
    public static String[] readGroup(String file) {
        int ctr = 0;
        try {
            Scanner s1 = new Scanner(new File(file));
            while (s1.hasNextLine()) {
                ctr = ctr + 1;
                s1.nextLine();
            }
            String[] words = new String[ctr];
            Scanner s2 = new Scanner(new File(file));
            for (int i = 0; i < ctr; i = i + 1) {
                words[i] = s2.nextLine();
            }
            return words;
        }
        catch (FileNotFoundException e) {
            System.out.println("File not found");
        }
        return null;
    }

    public static void readTeamsFromFile(){
        try {
            File curDir = new File(".");
            File[] filesList = curDir.listFiles();
            for (File f : filesList) {
                if (f.isFile()) {
                    System.out.println(f.getName());
                }
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    /**
     * Gets user's team list
     * @return user's team list
     */
    public ArrayList<String> getTeams() {
        return teams;
    }

    /**
     * Sets user's team list
     * @param teams arraylist containing user's team list
     */
    public void setTeams(ArrayList<String> teams) {
        this.teams = teams;
    }

    /**
     * get user's phone number
     * @return user's phone number
     */
    public String getPhoneNumber() {
        return phoneNumber;
    }

    /**
     * Set users phone number
     * @param phoneNumber int containing user's phone number
     */
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    /**
     * Gets users office phone number
     * @return user's office phone number
     */
    public String getOfficeNumber() {
        return officeNumber;
    }

    /**
     * Sets user's phone number
     * @param officeNumber string containing user's phone number
     */
    public void setOfficeNumber(String officeNumber) {
        this.officeNumber = officeNumber;
    }

    /**
     * Gets user's username
     * @return user's username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets user's username
     * @param username string containing user's username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password){
        this.password=password;
    }

    /**
     * gets user's email
     * @return user's email
     */


    public void setAdmin(boolean toSet){
        this.admin = toSet;
    }
    public boolean isAdmin() {
        return admin;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    /**Needed to implement userdetails**/
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return approved;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    @Override
    public int compareTo(Object o) {
        return 0;
    }

    public String getUserName() {
        return username;
    }
    //================================================================================
    @Column(name = "last_login")
    private Timestamp lastLogin;

    public void setLastLogin(Timestamp lastLogin) {
        this.lastLogin = lastLogin;
    }


}