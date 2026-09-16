package dev.paulbankl.gymleague.service;

import java.util.List;

import org.springframework.stereotype.Service;


import dev.paulbankl.gymleague.model.CommunityMember;

import dev.paulbankl.gymleague.repository.CommunityMemberRepository;
import dev.paulbankl.gymleague.repository.CommunityRepository;
import dev.paulbankl.gymleague.repository.UserRepository;


@Service
public class CommunityMemberService {
    private final CommunityMemberRepository communityMemberRepository;
    

    public CommunityMemberService(CommunityMemberRepository communityMemberRepository) {
        this.communityMemberRepository = communityMemberRepository;
    }
    public List<CommunityMember> getAll() {
        return communityMemberRepository.findAll();
    }

    

}
