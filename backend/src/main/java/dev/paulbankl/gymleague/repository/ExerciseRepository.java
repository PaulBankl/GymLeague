package dev.paulbankl.gymleague.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.paulbankl.gymleague.model.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    java.util.Optional<Exercise> findByName(String name);
}
