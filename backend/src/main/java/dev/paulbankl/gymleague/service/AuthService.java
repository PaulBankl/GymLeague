package dev.paulbankl.gymleague.service;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.RegisterDTO;
import dev.paulbankl.gymleague.exception.ConflictException;

import dev.paulbankl.gymleague.model.User;
import dev.paulbankl.gymleague.repository.UserRepository;

@Service
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }
    //legt wenn der user nd existiert einen neuen an
    public void tryRegisterUser(RegisterDTO registerDTO) {
        if (userRepository.existsByUsername(registerDTO.username()) || userRepository.existsByEmail(registerDTO.email())) {
            throw new ConflictException("Username or email already exists");
        }
        userRepository.save(new User(registerDTO.username(), registerDTO.email(), passwordEncoder.encode(registerDTO.password())));
    }
   
    
}
