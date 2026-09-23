package dev.paulbankl.gymleague.service;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.repository.UserRepository;
import dev.paulbankl.gymleague.dto.UpdateDisplayNameDTO;
import dev.paulbankl.gymleague.model.User;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    //schaut ob user exisitert
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    //returned den user wenn er existiert
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }

    //updated den displayname des users
    public boolean updateDisplayName(UpdateDisplayNameDTO updateDisplayNameDTO, Authentication auth) {
        String username = auth.getName();
        String displayName = updateDisplayNameDTO.displayName();

        if (userRepository.existsByDisplayName(displayName)) {
            return false;
        }
        if(!userRepository.existsByUsername(username)) {
            return false;
        }
        User user = userRepository.findByUsername(username).get();
        user.setDisplayName(displayName);
         userRepository.save(user);
         return true;
}
    public String getDisplayNameByUsername(String username) {
        User user = userRepository.findByUsername(username).get();
        return user.getDisplayName();
    }
    public boolean existsByDisplayName(String displayName) {
        return userRepository.existsByDisplayName(displayName);
    }
}