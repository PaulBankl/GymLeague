package dev.paulbankl.gymleague.service;


import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.paulbankl.gymleague.repository.UserRepository;
import dev.paulbankl.gymleague.dto.UpdateDisplayNameDTO;
import dev.paulbankl.gymleague.exception.ConflictException;
import dev.paulbankl.gymleague.exception.ForbiddenException;
import dev.paulbankl.gymleague.exception.ResourceNotFoundException;
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
       User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User with username " + username + " not found"));
       return user;
    }

    //updated den displayname des users
    @Transactional
    public void updateDisplayName(UpdateDisplayNameDTO updateDisplayNameDTO, Authentication auth) {
        System.out.println("AUTH NAME: " + auth.getName());
        String username = auth.getName();
        String displayName = updateDisplayNameDTO.displayName();

         if (displayName.isBlank()) {
        throw new ConflictException("Display name cannot be empty");
    }
        
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User with username " + username + " not found"));
        user.setDisplayName(displayName);
        userRepository.save(user);
}
    public String getDisplayNameByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User with username " + username + " not found"));
        return user.getDisplayName();
    }
    public boolean existsByDisplayName(String displayName) {
        return userRepository.existsByDisplayName(displayName);
    }
}