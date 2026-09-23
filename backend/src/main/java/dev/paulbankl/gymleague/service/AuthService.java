package dev.paulbankl.gymleague.service;

import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.LoginDTO;
import dev.paulbankl.gymleague.dto.RegisterDTO;
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
    public boolean tryRegisterUser(RegisterDTO registerDTO) {
        if (userRepository.existsByUsername(registerDTO.username()) || userRepository.existsByEmail(registerDTO.email())) {
            return false;
        }
        userRepository.save(new User(registerDTO.username(), registerDTO.email(), passwordEncoder.encode(registerDTO.password())));
        return true;
    }
    //schaut ob user exisitert und ob das passwort stimmt
    public boolean tryLoginUser(LoginDTO loginDTO) {
        Optional <User> user = userRepository.findByUsername(loginDTO.username());
        if (!user.isPresent()) {
            return false;
        }
        return passwordEncoder.matches(loginDTO.password(), user.get().getPasswordHash());
    }
}
