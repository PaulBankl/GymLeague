package dev.paulbankl.gymleague.service;

import dev.paulbankl.gymleague.repository.CommunityRepository;

public class CommunityService {
    private final CommunityRepository communityRepository;
    public CommunityService(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository; 
    }
}
