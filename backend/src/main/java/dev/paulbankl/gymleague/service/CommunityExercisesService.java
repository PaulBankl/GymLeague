package dev.paulbankl.gymleague.service;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.repository.CommunityExercisesRepository;

@Service
public class CommunityExercisesService {
    private final CommunityExercisesRepository communityExercisesRepository;

    public CommunityExercisesService(CommunityExercisesRepository communityExercisesRepository) {
        this.communityExercisesRepository = communityExercisesRepository;
    }
}
