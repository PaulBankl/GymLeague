package dev.paulbankl.gymleague.service;

import dev.paulbankl.gymleague.repository.ExerciseRepository;

public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    
    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }
}
