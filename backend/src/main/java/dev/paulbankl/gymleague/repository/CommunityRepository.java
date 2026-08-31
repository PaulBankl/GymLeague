package dev.paulbankl.gymleague.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.paulbankl.gymleague.model.Community;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    public boolean existsByName(String name);
    public Community findByName(String name);
}
