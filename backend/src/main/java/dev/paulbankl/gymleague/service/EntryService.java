package dev.paulbankl.gymleague.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.EntryChangeDTO;
import dev.paulbankl.gymleague.dto.EntryCreationDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.EntryDTO;
import dev.paulbankl.gymleague.exception.ForbiddenException;
import dev.paulbankl.gymleague.exception.ResourceNotFoundException;
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
    
    @Transactional
    public void insertEntry(EntryCreationDTO entryDTO, String username) {
        Exercise exercise = exerciseRepository
            .findById(entryDTO.exerciseId())
            .orElseThrow(() -> new ResourceNotFoundException("Exercise not found"));

        Entry entry = new Entry(entryDTO.weight(), entryDTO.reps(),userService.getUserByUsername(username), exercise);
        
        entryRepository.save(entry);
    }
    public EntryDTO getEntryById(Long id, String username) {
        Entry entry = entryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Entry with id " + id + " not found"));
        if (!entry.getUser().getUsername().equals(username)) {
            throw new ForbiddenException("You are not allowed to view this entry");
        }
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
    public void updateEntry(EntryChangeDTO entryChangeDTO, String username) {
        Entry entry = entryRepository.findById(entryChangeDTO.id())
            .orElseThrow(() -> new ResourceNotFoundException("Entry with id " + entryChangeDTO.id() + " not found"));
        if (!entry.getUser().getUsername().equals(username)) {
            throw new ForbiddenException("You are not allowed to update this entry");
        }
        entry.setWeight(entryChangeDTO.weight());
        entry.setReps(entryChangeDTO.reps());
        entryRepository.save(entry);
}
@Transactional
public void deleteEntry(Long id, String username) {
    Entry entry = entryRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Entry with id " + id + " not found"));
    if ( !entry.getUser().getUsername().equals(username)) {
        throw new ForbiddenException("You are not allowed to delete this entry");
    }
    entryRepository.delete(entry);
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
public Double getBestOneRMForUserAndExercise(Long exerciseId, String username) {
    List<Entry> entries =
        entryRepository.findByUserUsernameAndExerciseIdOrderByDateDesc(username, exerciseId);

    Double bestOneRM = 0.0;
    for(Entry entry: entries){
        if(estimateOneRm(entry) > bestOneRM){
            bestOneRM = estimateOneRm(entry);
        }
    }
    return bestOneRM;
}
    //Helpfunction to calculate the 1RM based on the Epley formula
    private double estimateOneRm(Entry entry) {
        if(entry.getReps() < 12) return 0;
    return entry.getWeight() * (1 + entry.getReps() / 30.0);
}
public Integer getEntryCount(Long exerciseId, String username) {
    return entryRepository.countByUserUsernameAndExerciseId(username, exerciseId);
}
}