package dev.paulbankl.gymleague.service;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.repository.ExerciseRepository;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    
    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }
}
