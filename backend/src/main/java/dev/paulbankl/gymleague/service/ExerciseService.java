package dev.paulbankl.gymleague.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.ResponseDTOs.ExerciseDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.ExerciseInfoDTO;
import dev.paulbankl.gymleague.exception.ResourceNotFoundException;
import dev.paulbankl.gymleague.model.Entry;
import dev.paulbankl.gymleague.model.Exercise;
import dev.paulbankl.gymleague.repository.ExerciseRepository;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final EntryService entryService;
    
    public ExerciseService(ExerciseRepository exerciseRepository, EntryService entryService) {
        this.exerciseRepository = exerciseRepository;
        this.entryService = entryService;
    }
   
    public List<ExerciseDTO> getAllExercises() {
        List<Exercise> exercises = exerciseRepository.findAll();
        return exercises.stream()
            .map(exercise -> new ExerciseDTO(exercise.getId(), exercise.getName()))
            .toList();
    }
    public ExerciseDTO getExerciseById(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Exercise with id " + id + " not found"));
        return new ExerciseDTO(exercise.getId(), exercise.getName());
    }
    public ExerciseInfoDTO getExerciseInfoById(Long id, String username) {
        if (!exerciseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Exercise with id " + id + " not found");
        }
        List<Entry> entries = entryService.getEntryForUserAndExercise(id, username);
        ProgressInfo progress = getProgressOneRm(entries);
        double progressPercent = 0.0;
        if (progress.initialOneRm() != 0.0) {
            progressPercent = progress.difference() / progress.initialOneRm() * 100;
            }
        Entry bestEntry = getBestEntry(entries);
        return new ExerciseInfoDTO(
            entries.size(),
            bestEntry,
            progressPercent,
            progress.difference()
        );
    }

    private record ProgressInfo(
    double difference,
    double initialOneRm
    ) {}

    private Entry getBestEntry(List<Entry> entries) {
        if (entries.isEmpty()) {
            return null;
        }
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

    private ProgressInfo getProgressOneRm(List<Entry> entries) {
        if (entries.size() < 2) {
            return new ProgressInfo(0.0, 0.0);
        }
            Entry newest = entries.get(0);
            Entry oldest = entries.get(entries.size() - 1);
            double newestOneRm = estimateOneRm(newest);
            double oldestOneRm = estimateOneRm(oldest);
            return new ProgressInfo(newestOneRm - oldestOneRm, oldestOneRm);
    }

    private static double estimateOneRm(Entry entry) {
    return entry.getWeight() * (1 + entry.getReps() / 30.0);
}
}
