package dev.paulbankl.gymleague.service;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.CommunityChangeDTO;
import dev.paulbankl.gymleague.dto.CommunityCreationDTO;
import dev.paulbankl.gymleague.dto.CommunityJoinDTO;
import dev.paulbankl.gymleague.dto.CommunityKickDTO;
import dev.paulbankl.gymleague.dto.RoleChangeDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.ComMemberListDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityDetailDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityOverviewDTO;
import dev.paulbankl.gymleague.model.Community;
import dev.paulbankl.gymleague.model.CommunityExercises;
import dev.paulbankl.gymleague.model.CommunityMember;
import dev.paulbankl.gymleague.model.CommunityRole;
import dev.paulbankl.gymleague.model.Exercise;
import dev.paulbankl.gymleague.repository.CommunityRepository;
import dev.paulbankl.gymleague.repository.ExerciseRepository;
import dev.paulbankl.gymleague.repository.UserRepository;
import jakarta.transaction.Transactional;
import dev.paulbankl.gymleague.repository.CommunityExercisesRepository;
import dev.paulbankl.gymleague.repository.CommunityMemberRepository;

import dev.paulbankl.gymleague.model.User;

@Service
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final CommunityMemberRepository communityMemberRepository;
    private final UserRepository userRepository;
    private final CommunityExercisesRepository communityExercisesRepository;
    private final ExerciseRepository exerciseRepository;

    public CommunityService(CommunityRepository communityRepository, CommunityMemberRepository communityMemberRepository, UserRepository userRepository, CommunityExercisesRepository communityExercisesRepository, ExerciseRepository exerciseRepository) {
        this.communityRepository = communityRepository;
        this.communityMemberRepository = communityMemberRepository;
        this.userRepository = userRepository;
        this.communityExercisesRepository = communityExercisesRepository;
        this.exerciseRepository = exerciseRepository;
    }
    @Transactional
    public boolean createCommunity(CommunityCreationDTO dto, String username) {
        if(communityRepository.existsByName(dto.getName())) {
            return false;
        }
        User owner = userRepository.findByUsername(dto.getUsername())
    .orElse(null);

if (owner == null) {
    return false;
}
        Community community = new Community(
        username,
        dto.getDescription(),
        dto.isPrivate(),
        owner
        );
        //Community wird erschaffen und CommunityMember wird erschaffen und gespeichert
        communityRepository.save(community);
        communityMemberRepository.save(new CommunityMember(owner, community, CommunityRole.OWNER));
        for(Long exerciseId : dto.getExerciseIds()) {
            CommunityExercises communityExercise = new CommunityExercises(community, exerciseRepository.findById(exerciseId).orElseThrow());
            communityExercisesRepository.save(communityExercise);
        }
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
    CommunityExercises [] communityExercises = communityExercisesRepository.findByCommunityId(id).toArray(new CommunityExercises[0]);
    Exercise [] exercises = (communityExercises.length > 0) ? java.util.Arrays.stream(communityExercises).map(CommunityExercises::getExercise).toArray(Exercise[]::new) : new Exercise[0];
    Community community = communityRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Community not found"));
    return new CommunityDetailDTO(
            community.getId(),
            community.getName(),
            community.getDescription(),
            community.getOwner().getUsername(),
            communityMemberRepository.countByCommunityId(community.getId()),
            community.getCreatedAt(),
            community.isPrivate(),
            exercises
    );
}

@Transactional
public boolean leaveCommunity(Long id, String username){
   User user = userRepository.findByUsername(username).orElse(null);
if (user == null) {
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
        
        communityExercisesRepository.deleteByCommunityId(id);
        communityMemberRepository.deleteByCommunityIdAndUserUsername(id, username);
        communityRepository.delete(community);
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
public List<ComMemberListDTO> getAllMembersOfCommunity(Long communityId) {
    return communityMemberRepository.findByCommunityIdOrderByRoleDescJoinedAtAsc(communityId)
            .stream()
            .map(member -> new ComMemberListDTO(
                    member.getUser().getUsername(),
                    member.getRole(),
                    member.getJoinedAt().toString()
            ))
            .toList();
}
public List<CommunityOverviewDTO> get10RandomCommunities(String username) {
    List<Community> communities = communityRepository.findDiscoverCommunities(username, PageRequest.of(0, 10));
    return communities.stream()
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
@Transactional 
public boolean changeCommunity(CommunityChangeDTO dto , String username) {
    Community community = communityRepository.findByName(dto.name())
        .orElse(null);
    if (community == null) {
        return false;
    }
    if(!community.getOwner().getUsername().equals(username)) {
        return false;
    }
    community.setDescription(dto.description());
    community.setPrivate(dto.isPrivate());
    communityExercisesRepository.deleteByCommunityId(community.getId());
    List<Exercise> exercises = exerciseRepository.findAllById(
    Arrays.asList(dto.exerciseIds())
);

for (Exercise exercise : exercises) {
    communityExercisesRepository.save(
        new CommunityExercises(community, exercise)
    );
}
    return true;
}

@Transactional
    public boolean joinCommunity(CommunityJoinDTO dto, String username) { 
        User user = userRepository.findByUsername(username).orElse(null);
        Community community = communityRepository.findById(dto.communityId()).orElse(null);
        if (user == null || community == null) {return false; // User or community not found
        }
        if (community.isPrivate()) {
    return false;
}
// Check if the user is already a member of the community
        if (communityMemberRepository.existsByCommunityIdAndUserUsername((dto.communityId()), dto.username())) {
            return false; // User is already a member
        }  
        communityMemberRepository.save(new CommunityMember(user, community, CommunityRole.USER));
        return true;
    }

    @Transactional 
    public boolean kickMember(CommunityKickDTO dto, String username) {
        if(username.equals(dto.kickUsername())){
            return false; // Owner cannot kick themselves
        }
        Community community = communityRepository.findById(dto.communityId()).orElse(null);
        if (community == null || !community.getOwner().getUsername().equals(username)) {
            return false; // Community not found or user is not the owner
        }
        return communityMemberRepository.deleteByCommunityIdAndUserUsername(dto.communityId(), dto.kickUsername()) > 0;
        }

        @Transactional 
        public boolean promoteMember(RoleChangeDTO dto, String username){
            Community community = communityRepository.findById(dto.communityId()).orElse(null);
            if (community == null || !community.getOwner().getUsername().equals(username)) {
                return false; // Community not found or user is not the owner
            }
            CommunityMember member = communityMemberRepository.findByCommunityIdAndUserUsername(dto.communityId(), dto.changeUsername()).orElse(null);
            if (member == null || member.getRole() == CommunityRole.OWNER) {
                return false; // Member not found or already an owner
            }
            switch (member.getRole()) {
                case USER -> member.setRole(CommunityRole.MODERATOR);
                case MODERATOR -> member.setRole(CommunityRole.ADMIN);
                case ADMIN, OWNER -> {
                    return false;
            }
            }
            return true;
        }

        @Transactional 
        public boolean demoteMember(RoleChangeDTO dto, String username){
            Community community = communityRepository.findById(dto.communityId()).orElse(null);
            if (community == null || !community.getOwner().getUsername().equals(username)) {
                return false; // Community not found or user is not the owner
            }
            CommunityMember member = communityMemberRepository.findByCommunityIdAndUserUsername(dto.communityId(), dto.changeUsername()).orElse(null);
            if (member == null || member.getRole() == CommunityRole.OWNER) {
                return false; // Member not found or already an owner
            }
            switch (member.getRole()) {
                case MODERATOR -> member.setRole(CommunityRole.USER);
                case ADMIN -> member.setRole(CommunityRole.MODERATOR);
                case USER, OWNER -> {
                    return false;
                }
            }
            return true;}
}
    
    
