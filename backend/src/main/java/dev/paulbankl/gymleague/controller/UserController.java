package dev.paulbankl.gymleague.controller;

import dev.paulbankl.gymleague.repository.UserRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.service.AuthService;
import dev.paulbankl.gymleague.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
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
public class UserController {
    private final UserService userService;
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository =
        new HttpSessionSecurityContextRepository();

    public UserController(UserService userService, AuthService authService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authService = authService;
        this.authenticationManager = authenticationManager;
    }
    @PostMapping("/register")
public ResponseEntity<Void> registerUser(@RequestBody RegisterDTO registerDTO) {
    boolean success = authService.tryRegisterUser(registerDTO);

    if (!success) {
        return ResponseEntity.status(409).build();
    }

    return ResponseEntity.status(201).build();
}
@GetMapping("/me")
public ResponseEntity<String> me(Authentication authentication) {
    return ResponseEntity.ok(authentication.getName());
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
public ResponseEntity<Void> login(@RequestBody LoginDTO loginDTO, HttpServletRequest request,
        HttpServletResponse response) {
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    loginDTO.getUsername(),
                    loginDTO.getPassword()
            )
    );

    SecurityContext context = SecurityContextHolder.createEmptyContext();
context.setAuthentication(authentication);
SecurityContextHolder.setContext(context);
securityContextRepository.saveContext(context, request, response);
    return ResponseEntity.ok().build();
}

    @PutMapping("/updateDisplayName")
    public boolean updateDisplayName(@RequestBody UpdateDisplayNameDTO updateDisplayNameDTO) {
            return userService.updateDisplayName(updateDisplayNameDTO);
        }

    
    
}
