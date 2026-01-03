package com.firstproject.platform.service;

import com.firstproject.platform.entity.User;
import com.firstproject.platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}
