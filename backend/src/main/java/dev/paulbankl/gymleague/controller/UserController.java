package dev.paulbankl.gymleague.controller;

import dev.paulbankl.gymleague.repository.UserRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import dev.paulbankl.gymleague.dto.LoginDTO;
import dev.paulbankl.gymleague.dto.RegisterDTO;
import dev.paulbankl.gymleague.dto.UpdateDisplayNameDTO;

@RestController
@RequestMapping("api/users")
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
    public String userExists(@PathVariable String username) {
        if(username == null || username.isEmpty()) {
            return "Username is empty";
        }
        if(userService.existsByUsername(username)) {
            return "User exists. " + userService.getDisplayNameByUsername(username);
        } else {
            return "User does not exist";
        }
    }
    @PostMapping("/login")
    public boolean loginUser(@RequestBody LoginDTO loginDTO) {
        return userService.tryLoginUser(loginDTO);
    }

    @PostMapping("/updateDisplayName")
    public boolean updateDisplayName(@RequestBody UpdateDisplayNameDTO updateDisplayNameDTO) {
            return userService.updateDisplayName(updateDisplayNameDTO);
        }

    
    
}
