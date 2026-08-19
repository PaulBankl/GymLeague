package dev.paulbankl.gymleague.service;

import dev.paulbankl.gymleague.repository.UserRepository;

public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
