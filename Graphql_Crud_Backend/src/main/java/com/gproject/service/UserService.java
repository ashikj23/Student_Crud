package com.gproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.gproject.entity.User;
import com.gproject.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    

    private final UserRepository userRepository;
    
    //1. Gets all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    //2. Gets user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    //3. Gets users by name 
    public List<User> getUsersByName(String name) {
        return userRepository.findByNameContainingIgnoreCase(name);
    }
    
    //4. Creates a new user 
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists: " + user.getEmail());
        }
        return userRepository.save(user);
    }
    //5. Updates an existing user
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        if (!user.getEmail().equals(userDetails.getEmail()) && 
            userRepository.existsByEmail(userDetails.getEmail())) {
            throw new RuntimeException("Email already exists: " + userDetails.getEmail());
        }
        
        if(userDetails.getName()!=null&& !userDetails.getName().equals(""))  userDetails.setName(userDetails.getName());
        if(userDetails.getEmail()!=null) user.setEmail(userDetails.getEmail());
        if(userDetails.getAge()!=null ) user.setAge(userDetails.getAge());
        
        return userRepository.save(user);
    }
    //5. Deletes a user by ID
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}