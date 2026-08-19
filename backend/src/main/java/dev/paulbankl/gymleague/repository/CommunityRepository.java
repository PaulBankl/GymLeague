package dev.paulbankl.gymleague.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.paulbankl.gymleague.model.Community;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    
}
