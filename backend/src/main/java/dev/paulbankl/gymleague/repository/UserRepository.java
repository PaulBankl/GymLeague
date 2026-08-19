package dev.paulbankl.gymleague.repository;
import dev.paulbankl.gymleague.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
}