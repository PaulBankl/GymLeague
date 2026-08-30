package dev.paulbankl.gymleague.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.model.Exercise;
import dev.paulbankl.gymleague.repository.ExerciseRepository;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    
    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
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
}
