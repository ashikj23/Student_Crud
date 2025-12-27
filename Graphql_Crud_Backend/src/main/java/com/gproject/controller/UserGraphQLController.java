package com.gproject.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.gproject.entity.User;
import com.gproject.service.UserService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class UserGraphQLController {
    
   
    private final UserService userService;
    
    @QueryMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
    @QueryMapping
    public Optional<User> getUserById(@Argument Long id) {
        return userService.getUserById(id);
    }
    
    @QueryMapping
    public List<User> getUsersByName(@Argument String name) {
        return userService.getUsersByName(name);
    }
    
    @MutationMapping
    public User createUser(@Argument String name, @Argument String email, @Argument Integer age) {
        User user = new User(name, email, age);
        return userService.createUser(user);
    }
    
    @MutationMapping
    public User updateUser(@Argument Long id, @Argument String name, 
                          @Argument String email, @Argument Integer age) {
        User userDetails = new User(name, email, age);
        return userService.updateUser(id, userDetails);
    }
    
    @MutationMapping
    public Boolean deleteUser(@Argument Long id) {
        return userService.deleteUser(id);
    }
}