package dev.paulbankl.gymleague.service;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.repository.CommunityMemberRepository;

@Service
public class CommunityMemberService {
    private final CommunityMemberRepository communityMemberRepository;

    public CommunityMemberService(CommunityMemberRepository communityMemberRepository) {
        this.communityMemberRepository = communityMemberRepository;
    }
}
