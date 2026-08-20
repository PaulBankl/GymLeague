package dev.paulbankl.gymleague.service;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.repository.CommunityExerciseRepository;

@Service
public class CommunityExercisesService {
    private final CommunityExerciseRepository communityExerciseRepository;

    public CommunityExercisesService(CommunityExerciseRepository communityExerciseRepository) {
        this.communityExerciseRepository = communityExerciseRepository;
    }
}
