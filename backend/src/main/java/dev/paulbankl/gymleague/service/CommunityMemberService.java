package dev.paulbankl.gymleague.service;

import dev.paulbankl.gymleague.repository.CommunityMemberRepository;

public class CommunityMemberService {
    private final CommunityMemberRepository communityMemberRepository;

    public CommunityMemberService(CommunityMemberRepository communityMemberRepository) {
        this.communityMemberRepository = communityMemberRepository;
    }
}
