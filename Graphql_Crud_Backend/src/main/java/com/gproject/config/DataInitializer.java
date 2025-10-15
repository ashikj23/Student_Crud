package com.gproject.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.gproject.entity.User;
import com.gproject.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {
 
 @Autowired
 private UserRepository userRepository;
 
 @Override
 public void run(String... args) throws Exception {
     // Create some sample users
     userRepository.save(new User("John Doe", "john.doe@example.com", 30));
     userRepository.save(new User("Jane Smith", "jane.smith@example.com", 25));
     userRepository.save(new User("Bob Johnson", "bob.johnson@example.com", 35));
     
     System.out.println("Sample data initialized!");
 }
}