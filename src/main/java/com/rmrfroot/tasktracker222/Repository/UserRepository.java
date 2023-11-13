package com.rmrfroot.tasktracker222.Repository;

import com.rmrfroot.tasktracker222.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Transactional(readOnly = true)
    User findByUsername(String username);


    //Optional<User> findByEmail(String email);

    void updateLastLogin(Date date);
}
