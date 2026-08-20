package dev.paulbankl.gymleague.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.repository.UserRepository;
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
    //legt wenn der user nd existiert einen neuen an
    public boolean tryRegisterUser(String username, String password, String email) {
        if (userRepository.existsByUsername(username) || userRepository.existsByEmail(email)) {
            return false;
        }
        userRepository.save(new User(username, email, password));
        return true;
    }
    //schaut ob user exisitert und ob das passwort stimmt
    public boolean tryLoginUser(String username, String password) {
        Optional <User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            return false;
        }
        return user.get().getPasswordHash().equals(password);
    }
    //returned den user wenn er existiert
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }

    //updated den displayname des users
    public boolean updateDisplayName(String username, String displayName) {

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