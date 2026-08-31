package dev.paulbankl.gymleague.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.EntryChangeDTO;
import dev.paulbankl.gymleague.dto.EntryCreationDTO;
import dev.paulbankl.gymleague.model.Entry;
import dev.paulbankl.gymleague.repository.EntryRepository;
import dev.paulbankl.gymleague.repository.ExerciseRepository;

@Service
public class EntryService {
    private final EntryRepository entryRepository;
    private final UserService userService;
    private final ExerciseRepository exerciseRepository;

    public EntryService(EntryRepository entryRepository, UserService userService, ExerciseRepository exerciseRepository) {
        this.entryRepository = entryRepository;
        this.userService = userService;
        this.exerciseRepository = exerciseRepository;
    }
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }
    public void insertEntry(EntryCreationDTO entryDTO) {
        Entry entry = new Entry(entryDTO.getWeight(), entryDTO.getReps(),userService.getUserByUsername(entryDTO.getUsername()), exerciseRepository.findById(entryDTO.getExerciseId()).orElse(null));
        entryRepository.save(entry);
    }
    public Entry getEntryById(Long id) {
        return entryRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Entry with id " + id + " not found"));
    }
    public boolean updateEntry(EntryChangeDTO entryChangeDTO) {
        Entry entry = entryRepository.findById(entryChangeDTO.getId())
            .orElseThrow(() -> new IllegalArgumentException("Entry with id " + entryChangeDTO.getId() + " not found"));
        entry.setWeight(entryChangeDTO.getWeight());
        entry.setReps(entryChangeDTO.getReps());
        entryRepository.save(entry);
        return true;
}
public boolean deleteEntry(Long id) {
    if (!entryRepository.existsById(id)) {
        return false;
    }
    entryRepository.deleteById(id);
    return true;
}

//Holt alle Einträge für einen bestimmten Benutzer und eine bestimmte Übung
public List<Entry> getEntryForUserAndExercise(Long exerciseId, String username) {
    return entryRepository.findByUserUsernameAndExerciseIdOrderByDateDesc(username, exerciseId);
}
public Entry getBestEntryForUserAndExercise(Long exerciseId, String username) {

    List<Entry> entries =
        entryRepository.findByUserUsernameAndExerciseIdOrderByDateDesc(username, exerciseId);

    Entry bestEntry = null;

    for (Entry entry : entries) {

        if (entry.getReps() > 12) {
            continue;
        }

        if (bestEntry == null || estimateOneRm(entry) > estimateOneRm(bestEntry)) {
            bestEntry = entry;
        }
    }

    return bestEntry;
}
    //Helpfunction to calculate the 1RM based on the Epley formula
    private double estimateOneRm(Entry entry) {
    return entry.getWeight() * (1 + entry.getReps() / 30.0);
}
public Integer getEntryCount(Long exerciseId, String username) {
    return entryRepository.countByUserUsernameAndExerciseId(username, exerciseId);
}
}