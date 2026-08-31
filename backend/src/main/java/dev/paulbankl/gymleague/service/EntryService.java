package dev.paulbankl.gymleague.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.EntryChangeDTO;
import dev.paulbankl.gymleague.dto.EntryCreationDTO;
import dev.paulbankl.gymleague.model.Entry;
import dev.paulbankl.gymleague.repository.EntryRepository;

@Service
public class EntryService {
    private final EntryRepository entryRepository;
    private final UserService userService;
    private final ExerciseService exerciseService;

    public EntryService(EntryRepository entryRepository, UserService userService, ExerciseService exerciseService) {
        this.entryRepository = entryRepository;
        this.userService = userService;
        this.exerciseService = exerciseService;
    }
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }
    public void insertEntry(EntryCreationDTO entryDTO) {
        Entry entry = new Entry(entryDTO.getWeight(), entryDTO.getReps(),userService.getUserByUsername(entryDTO.getUsername()), exerciseService.getExerciseById(entryDTO.getExerciseId()));
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
public List<Entry> getEntryforUserAndExercise(Long exerciseId, String username) {
    return entryRepository.findByUserUsernameAndExerciseIdOrderByDateDesc(username, exerciseId);
}
}