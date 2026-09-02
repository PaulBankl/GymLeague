package dev.paulbankl.gymleague.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.paulbankl.gymleague.model.Community;
import dev.paulbankl.gymleague.model.User;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    public boolean existsByName(String name);
    public Community findByName(String name);
    public Optional<Community> findById(Long id);


}
