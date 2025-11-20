package com.firstproject.platform.SERVICE;

import com.firstproject.platform.MODEL.User;
import com.firstproject.platform.REPOSITORY.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserService {

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private final UserRepository userRepository;

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
