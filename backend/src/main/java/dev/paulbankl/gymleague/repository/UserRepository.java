package dev.paulbankl.gymleague.repository;
import dev.paulbankl.gymleague.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public boolean existsByUsername(String username);

    public Optional<User> findByUsername(String username);

    public boolean existsByDisplayName(String displayName);

    public boolean existsByEmail(String email);
}