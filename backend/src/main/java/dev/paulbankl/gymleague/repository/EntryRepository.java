package dev.paulbankl.gymleague.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.paulbankl.gymleague.model.Entry;

public interface EntryRepository extends JpaRepository<Entry, Long> {
    
}
