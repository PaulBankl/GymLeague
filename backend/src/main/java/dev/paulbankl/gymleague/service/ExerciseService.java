package dev.paulbankl.gymleague.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.ResponseDTOs.ExerciseInfoDTO;
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
    public Exercise getExerciseByName(String name) {
        return exerciseRepository.findByName(name)
            .orElseThrow(() -> new IllegalArgumentException("Exercise with name " + name + " not found"));
    }
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }
    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Exercise with id " + id + " not found"));
    }
    public ExerciseInfoDTO getExerciseInfoById(Long id, String username) {
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
