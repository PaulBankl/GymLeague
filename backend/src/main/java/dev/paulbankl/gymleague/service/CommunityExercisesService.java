package dev.paulbankl.gymleague.service;

import dev.paulbankl.gymleague.repository.CommunityExerciseRepository;

public class CommunityExercisesService {
    private final CommunityExerciseRepository communityExerciseRepository;

    public CommunityExercisesService(CommunityExerciseRepository communityExerciseRepository) {
        this.communityExerciseRepository = communityExerciseRepository;
    }
}
