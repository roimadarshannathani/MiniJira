package com.myjira.backend.service;

import com.myjira.backend.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;


public interface UserService {
    User register(User user);
    User authenticate(String username, String password);
    String getUsername(HttpServletRequest request);
}
