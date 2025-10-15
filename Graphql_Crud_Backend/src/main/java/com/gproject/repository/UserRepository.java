package com.gproject.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gproject.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
 List<User> findByNameContainingIgnoreCase(String name);
 User findByEmail(String email);
 boolean existsByEmail(String email);
}