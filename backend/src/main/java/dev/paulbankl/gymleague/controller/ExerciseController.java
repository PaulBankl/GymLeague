package dev.paulbankl.gymleague.controller;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.dto.ResponseDTOs.ExerciseInfoDTO;
import dev.paulbankl.gymleague.model.Exercise;
import dev.paulbankl.gymleague.service.AuthService;
import dev.paulbankl.gymleague.service.ExerciseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }
    @GetMapping("/all")
    public List<Exercise> getAllExercises() {
        return exerciseService.getAllExercises();
    }
    
    @GetMapping("/{id}")
    public Exercise getExerciseById(@PathVariable Long id) {
        return exerciseService.getExerciseById(id);
    }

    @GetMapping("/info/{id}")
    public ExerciseInfoDTO getMethodName(@PathVariable Long id, Authentication authentication) {
        return exerciseService.getExerciseInfoById(id, authentication.getName());
    }
    
}
