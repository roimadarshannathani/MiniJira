package com.myjira.backend.controller;

import com.myjira.backend.entity.User;
import com.myjira.backend.service.UserService;
import com.myjira.backend.utils.ApiResponse;
import com.myjira.backend.utils.ApiResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.myjira.backend.utils.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody User user) {
        User registered = userService.register(user);
        return ApiResponseUtil.handleResponse(HttpStatus.CREATED, registered, "User registered");
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@RequestBody User user, HttpServletResponse response) {
        User authenticated = userService.authenticate(user.getUsername(), user.getPassword());
        if (authenticated == null) {
            return ApiResponseUtil.handleResponse(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        String token = jwtUtil.generateToken(authenticated.getUsername());
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .path("/")
                .maxAge(24 * 60 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ApiResponseUtil.handleResponse(HttpStatus.OK, token, "Login successful");
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ApiResponseUtil.handleResponse(HttpStatus.OK, "Logged out");
    }

    @GetMapping("/get-user")
    public ResponseEntity<ApiResponse<String>> getUsername(HttpServletRequest request){
        String username = userService.getUsername(request);
        return ApiResponseUtil.handleResponse(HttpStatus.OK, username,"Items added successfully");
    }
}