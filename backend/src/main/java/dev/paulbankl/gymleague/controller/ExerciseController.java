package dev.paulbankl.gymleague.controller;

import java.util.List;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.dto.ResponseDTOs.ExerciseDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.ExerciseInfoDTO;
import dev.paulbankl.gymleague.model.Exercise;

import dev.paulbankl.gymleague.service.ExerciseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("api/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }
    @GetMapping("/all")
    public List<ExerciseDTO> getAllExercises() {
        return exerciseService.getAllExercises();
    }
    
    @GetMapping("/{id}")
    public ExerciseDTO getExerciseById(@PathVariable Long id) {
        return exerciseService.getExerciseById(id);
    }

    @GetMapping("/info/{id}")
    public ExerciseInfoDTO getMethodName(@PathVariable Long id, Authentication authentication) {
        return exerciseService.getExerciseInfoById(id, authentication.getName());
    }
    
}
