package dev.paulbankl.gymleague.service;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.repository.CommunityRepository;

@Service
public class CommunityService {
    private final CommunityRepository communityRepository;
    
    public CommunityService(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository; 
    }
}
