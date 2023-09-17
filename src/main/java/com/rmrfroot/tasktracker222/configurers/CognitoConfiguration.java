package com.rmrfroot.tasktracker222.configurers;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Adding controllers for MFA when it is implemented
*/


@Configuration
public class CognitoConfiguration implements WebMvcConfigurer{

@Override
    public void addViewControllers(ViewControllerRegistry registry){
        registry.addViewController("/").setViewName("home");
}
}
