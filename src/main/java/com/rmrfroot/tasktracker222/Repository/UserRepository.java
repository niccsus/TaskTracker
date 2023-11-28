package com.rmrfroot.tasktracker222.Repository;

import com.rmrfroot.tasktracker222.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {


    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.lastLogin = :date WHERE u.username = :username")
    void updateLastLogin(@Param("username") String username, @Param("date") Date date);

    @Transactional(readOnly = true)
    User findByUsername(String username);


    //Optional<User> findByEmail(String email);


}
