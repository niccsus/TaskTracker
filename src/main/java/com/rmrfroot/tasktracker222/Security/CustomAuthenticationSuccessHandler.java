package com.rmrfroot.tasktracker222.Security;

import com.rmrfroot.tasktracker222.entities.User;
import com.rmrfroot.tasktracker222.services.UsersDaoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * CustomAuthenticationSuccessHandler class implements the AuthenticationSuccessHandler interface
 * to handle successful authentication events. This class is responsible for performing actions
 * upon a user's successful login, such as updating the last login in the database, checking for
 * temporary password status
 * and redirecting the user to a specified page.
 *
 * Features:
 * - Retrieves authenticated user details from the database using UsersDaoServiceImpl.
 * - Performs custom actions or logging upon successful authentication.
 * - Redirects the user to a designated page after successful authentication.
 *
 * Note: This class assumes that UsersDaoServiceImpl is autowired and accessible for fetching user details.
 *
 * @author Nicholas Burt
 * @since 22-Nov-2023
 */
@Service
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UsersDaoServiceImpl usersDaoService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        //here is what is done after a successfully logging
        User user = usersDaoService.findUserByUsername(authentication.getName());
        usersDaoService.updateLastLogin(user);
        if (user.needsPasswordReset() != null && user.needsPasswordReset()){
            response.sendRedirect("/temp-password");
        }else{
            response.sendRedirect("/drill-schedule-recipient");

        }
}}
