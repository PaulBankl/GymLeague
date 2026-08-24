package dev.paulbankl.gymleague.service;


import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.CommunityCreationDTO;
import dev.paulbankl.gymleague.model.Community;
import dev.paulbankl.gymleague.model.CommunityMember;
import dev.paulbankl.gymleague.model.CommunityRole;
import dev.paulbankl.gymleague.repository.CommunityRepository;
import dev.paulbankl.gymleague.repository.UserRepository;
import dev.paulbankl.gymleague.repository.CommunityMemberRepository;

@Service
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final CommunityMemberRepository CommunityMemberRepository;
    private final UserRepository UserRepository;

    public CommunityService(CommunityRepository communityRepository, CommunityMemberRepository communityMemberRepository, UserRepository userRepository) {
        this.communityRepository = communityRepository;
        this.CommunityMemberRepository = communityMemberRepository;
        this.UserRepository = userRepository;
    }
    public boolean createCommunity(CommunityCreationDTO dto) {
        if(communityRepository.existsByName(dto.getName())) {
            return false;
        }
        if(!UserRepository.existsByUsername(dto.getUsername())) {
            return false;
        }
        //Community wird erschaffen und CommunityMember wird erschaffen und gespeichert
        communityRepository.save(new Community(dto.getName(), dto.getDescription(), dto.isPrivate()));
        CommunityMemberRepository.save(new CommunityMember(UserRepository.findByUsername(dto.getUsername()).get(), communityRepository.findByName(dto.getName()), CommunityRole.OWNER));
        return true;
    }
}
