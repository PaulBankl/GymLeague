package dev.paulbankl.gymleague.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.paulbankl.gymleague.model.Entry;

public interface EntryRepository extends JpaRepository<Entry, Long> {
    List<Entry> findByUserUsernameAndExerciseIdOrderByDateDesc(String userName, Long exerciseId);

    Integer countByUserUsernameAndExerciseId(String userName, Long exerciseId);
}
