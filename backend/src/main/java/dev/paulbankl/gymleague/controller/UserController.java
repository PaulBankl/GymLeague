package dev.paulbankl.gymleague.controller;

import dev.paulbankl.gymleague.repository.UserRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import dev.paulbankl.gymleague.dto.LoginDTO;
import dev.paulbankl.gymleague.dto.RegisterDTO;
import dev.paulbankl.gymleague.dto.UpdateDisplayNameDTO;

import java.util.Map;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/register")
    public boolean registerUser(@RequestBody RegisterDTO registerDTO) {
        return userService.tryRegisterUser(registerDTO);
    }

@GetMapping("/{username}")
public Map<String, Object> userExists(@PathVariable String username) {

    if (username == null || username.isEmpty()) {
        return Map.of("exists", false);
    }

    if (userService.existsByUsername(username)) {
        return Map.of(
            "exists", true,
            "displayName", userService.getDisplayNameByUsername(username)
        );
    }

    return Map.of("exists", false);
}
    @PostMapping("/login")
    public boolean loginUser(@RequestBody LoginDTO loginDTO) {
        return userService.tryLoginUser(loginDTO);
    }

    @PutMapping("/updateDisplayName")
    public boolean updateDisplayName(@RequestBody UpdateDisplayNameDTO updateDisplayNameDTO) {
            return userService.updateDisplayName(updateDisplayNameDTO);
        }

    
    
}
