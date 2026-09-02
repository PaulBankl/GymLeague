package dev.paulbankl.gymleague.service;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.CommunityCreationDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityDetailDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityOverviewDTO;
import dev.paulbankl.gymleague.model.Community;
import dev.paulbankl.gymleague.model.CommunityMember;
import dev.paulbankl.gymleague.model.CommunityRole;
import dev.paulbankl.gymleague.repository.CommunityRepository;
import dev.paulbankl.gymleague.repository.UserRepository;
import jakarta.transaction.Transactional;
import dev.paulbankl.gymleague.repository.CommunityMemberRepository;

import dev.paulbankl.gymleague.model.User;

@Service
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final CommunityMemberRepository communityMemberRepository;
    private final UserRepository userRepository;

    public CommunityService(CommunityRepository communityRepository, CommunityMemberRepository communityMemberRepository, UserRepository userRepository) {
        this.communityRepository = communityRepository;
        this.communityMemberRepository = communityMemberRepository;
        this.userRepository = userRepository;
    }
    @Transactional
    public boolean createCommunity(CommunityCreationDTO dto) {
        if(communityRepository.existsByName(dto.getName())) {
            return false;
        }
        User owner = userRepository.findByUsername(dto.getUsername())
    .orElse(null);

if (owner == null) {
    return false;
}
        Community community = new Community(
        dto.getName(),
        dto.getDescription(),
        dto.isPrivate(),
        owner
        );
        //Community wird erschaffen und CommunityMember wird erschaffen und gespeichert
        communityRepository.save(community);
        communityMemberRepository.save(new CommunityMember(owner, community, CommunityRole.OWNER));
        return true;
    }
    public List<CommunityOverviewDTO> getAllCommunitiesForUser(String username) {
        return communityMemberRepository.findByUserUsername(username)
                .stream()
                .map(CommunityMember::getCommunity)
                .map(community -> new CommunityOverviewDTO(
                        community.getId(),
                        community.getName(),
                        community.getDescription(),
                        community.isPrivate(),
                        community.getCreatedAt().toString(),
                        community.getOwner().getUsername(),
                        communityMemberRepository.countByCommunityId(community.getId())
                ))
                .toList();
    }
    public CommunityDetailDTO getCommunityDetails(Long id) {

    Community community = communityRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Community not found"));
    return new CommunityDetailDTO(
            community.getName(),
            community.getDescription(),
            community.getOwner().getUsername(),
            communityMemberRepository.countByCommunityId(community.getId()),
            community.getCreatedAt(),
            community.isPrivate()
    );
}

@Transactional
public boolean leaveCommunity(Long id, String username){
   if (!userRepository.existsByUsername(username)) {
    return false;
}
Community community = communityRepository.findById(id)
    .orElse(null);

if (community == null) {
    return false;
}
    if(community.getOwner().getUsername().equals(username)) {
        if(communityMemberRepository.countByCommunityId(id) > 1) {
            findNewOwner(id, community);
            return communityMemberRepository.deleteByCommunityIdAndUserUsername(id, username) > 0;
        }
        
        communityMemberRepository.deleteByCommunityIdAndUserUsername(id, username);
        communityRepository.deleteById(id);
        return true;
    }
    return communityMemberRepository.deleteByCommunityIdAndUserUsername(id, username) > 0;
}
private void findNewOwner(Long id, Community community){
    List<CommunityMember> members = communityMemberRepository.findByCommunityIdOrderByRoleDescJoinedAtAsc(id);
    if (members.size() < 2) {
    return;
}
    CommunityMember newOwner = members.get(1);
    newOwner.setRole(CommunityRole.OWNER);
    community.setOwner(newOwner.getUser());
}
}
