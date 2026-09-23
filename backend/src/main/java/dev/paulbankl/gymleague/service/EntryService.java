package dev.paulbankl.gymleague.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.EntryChangeDTO;
import dev.paulbankl.gymleague.dto.EntryCreationDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.EntryDTO;
import dev.paulbankl.gymleague.model.Entry;
import dev.paulbankl.gymleague.model.Exercise;
import dev.paulbankl.gymleague.repository.EntryRepository;
import dev.paulbankl.gymleague.repository.ExerciseRepository;
import jakarta.transaction.Transactional;

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
    public List<EntryDTO> getAllEntries() {
        return entryRepository.findAll().stream().map(entry -> new EntryDTO(
            entry.getId(),
            entry.getWeight(),
            entry.getReps(),
            entry.getUser().getUsername(),
            entry.getExercise().getName(),
            entry.getDate().toString()
        )).toList();
    }
    @Transactional
    public boolean insertEntry(EntryCreationDTO entryDTO, String username) {
        Exercise exercise = exerciseRepository
            .findById(entryDTO.exerciseId())
            .orElse(null);

    if (exercise == null) {
            return false;
    }
        Entry entry = new Entry(entryDTO.weight(), entryDTO.reps(),userService.getUserByUsername(username), exerciseRepository.findById(entryDTO.exerciseId()).orElse(null));
        
        entryRepository.save(entry);
        return true;
    }
    public EntryDTO getEntryById(Long id) {
        Entry entry = entryRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Entry with id " + id + " not found"));
        EntryDTO entryDTO = new EntryDTO(
            entry.getId(),
            entry.getWeight(),
            entry.getReps(),
            entry.getUser().getUsername(),
            entry.getExercise().getName(),
            entry.getDate().toString()
        );
        return entryDTO;
    }
    @Transactional
    public boolean updateEntry(EntryChangeDTO entryChangeDTO, String username) {
        Entry entry = entryRepository.findById(entryChangeDTO.id())
            .orElseThrow(() -> new IllegalArgumentException("Entry with id " + entryChangeDTO.id() + " not found"));
        if (!entry.getUser().getUsername().equals(username)) {
            return false;
        }
        entry.setWeight(entryChangeDTO.weight());
        entry.setReps(entryChangeDTO.reps());
        entryRepository.save(entry);
        return true;
}
@Transactional
public boolean deleteEntry(Long id, String username) {
    if (!entryRepository.existsById(id) || !entryRepository.findById(id).get().getUser().getUsername().equals(username)) {
        return false;
    }
    entryRepository.deleteById(id);
    return true;
}

//Holt alle Einträge für einen bestimmten Benutzer und eine bestimmte Übung
public List<Entry> getEntryForUserAndExercise(Long exerciseId, String username) {
    return entryRepository.findByUserUsernameAndExerciseIdOrderByDateDesc(username, exerciseId);
}
public List<EntryDTO> getEntryDTOForUserAndExercise(Long exerciseId, String username) {
    List<Entry> entries = entryRepository.findByUserUsernameAndExerciseIdOrderByDateDesc(username, exerciseId);
    return entries.stream().map(entry -> new EntryDTO(
        entry.getId(),
        entry.getWeight(),
        entry.getReps(),
        entry.getUser().getUsername(),
        entry.getExercise().getName(),
        entry.getDate().toString()
    )).toList();
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