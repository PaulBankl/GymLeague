package dev.paulbankl.gymleague.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.paulbankl.gymleague.model.CommunityExercises;

public interface CommunityExercisesRepository extends JpaRepository<CommunityExercises, Long> {
    
}
