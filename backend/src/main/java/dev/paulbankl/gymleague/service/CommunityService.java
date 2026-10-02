package dev.paulbankl.gymleague.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.CommunityChangeDTO;
import dev.paulbankl.gymleague.dto.CommunityCreationDTO;
import dev.paulbankl.gymleague.dto.CommunityJoinDTO;
import dev.paulbankl.gymleague.dto.CommunityKickDTO;
import dev.paulbankl.gymleague.dto.JoinCodeDTO;
import dev.paulbankl.gymleague.dto.RoleChangeDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.ComMemberListDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityActivityDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityDetailDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityOverviewDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.ExerciseDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.ExerciseRankingDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.RankingDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.UserRankingDTO;
import dev.paulbankl.gymleague.exception.ConflictException;
import dev.paulbankl.gymleague.exception.ForbiddenException;
import dev.paulbankl.gymleague.exception.ResourceNotFoundException;
import dev.paulbankl.gymleague.model.ActivityTone;
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
    private final EntryService entryService;
    private final CommunityActivityService communityActivityService;
    

    public CommunityService(CommunityRepository communityRepository, CommunityMemberRepository communityMemberRepository, UserRepository userRepository, CommunityExercisesRepository communityExercisesRepository, ExerciseRepository exerciseRepository,EntryService entryService, CommunityActivityService communityActivityService) {
        this.communityRepository = communityRepository;
        this.communityMemberRepository = communityMemberRepository;
        this.userRepository = userRepository;
        this.communityExercisesRepository = communityExercisesRepository;
        this.exerciseRepository = exerciseRepository;
        this.entryService = entryService;
        this.communityActivityService = communityActivityService;
    }
    @Transactional
    public void createCommunity(CommunityCreationDTO dto, String username) {
        if(communityRepository.existsByName(dto.name())) {
            throw new ConflictException("Community with this name already exists");
        }
        User owner = userRepository.findByUsername(username).orElse(null);

if (owner == null) {
    throw new ResourceNotFoundException("User not found");
}
        Community community = new Community(
        dto.name(),
        dto.description(),
        dto.isPrivate(),
        owner,
        dto.joinCode()
        );
        //Community wird erschaffen und CommunityMember wird erschaffen und gespeichert
        communityRepository.save(community);
        communityMemberRepository.save(new CommunityMember(owner, community, CommunityRole.OWNER));
        if(dto.exerciseIds() == null || dto.exerciseIds().isEmpty()) {
            return;
        }
        for(Long exerciseId : dto.exerciseIds()) {
            CommunityExercises communityExercise = new CommunityExercises(community, exerciseRepository.findById(exerciseId).orElseThrow(() -> new ResourceNotFoundException("Exercise not found")));
            communityExercisesRepository.save(communityExercise);
        }
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
    public CommunityDetailDTO getCommunityDetails(Long id, String username) {
        Community community = communityRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Community not found"));
        
        
    CommunityExercises [] communityExercises = communityExercisesRepository.findByCommunityId(id).toArray(new CommunityExercises[0]);
    Exercise [] exercises = (communityExercises.length > 0) ? java.util.Arrays.stream(communityExercises).map(CommunityExercises::getExercise).toArray(Exercise[]::new) : new Exercise[0];
    
    if(community.getOwner().getUsername().equals(username)) {
            return new CommunityDetailDTO(
            community.getId(),
            community.getName(),
            community.getDescription(),
            community.getOwner().getUsername(),
            communityMemberRepository.countByCommunityId(community.getId()),
            community.getCreatedAt(),
            community.isPrivate(),
            exercises.length > 0 ? java.util.Arrays.stream(exercises).map(exercise -> new ExerciseDTO(exercise.getId(), exercise.getName())).toArray(ExerciseDTO[]::new) : new ExerciseDTO[0],
            community.getJoinCode()
    );
        }
        else{
            return new CommunityDetailDTO(
            community.getId(),
            community.getName(),
            community.getDescription(),
            community.getOwner().getUsername(),
            communityMemberRepository.countByCommunityId(community.getId()),
            community.getCreatedAt(),
            community.isPrivate(),
            exercises.length > 0 ? java.util.Arrays.stream(exercises).map(exercise -> new ExerciseDTO(exercise.getId(), exercise.getName())).toArray(ExerciseDTO[]::new) : new ExerciseDTO[0],
            "0000"
    );
        }
}

@Transactional
public void leaveCommunity(Long id, String username){
   

Community community = communityRepository.findById(id)
    .orElse(null);

if (community == null) {
    throw new ResourceNotFoundException("Community not found");
}
if(!communityMemberRepository.existsByCommunityIdAndUserUsername(id, username)) {
    throw new ConflictException("User is not a member of this community");
}
    if(community.getOwner().getUsername().equals(username)) {
        if(communityMemberRepository.countByCommunityId(id) > 1) {
            findNewOwner(id, community, username);
            communityMemberRepository.deleteByCommunityIdAndUserUsername(id, username);
            communityActivityService.addActivity(username, ActivityTone.NEGATIVE, username + " left the community", community);
            return;
        }
        
        communityActivityService.deleteActivitiesByCommunityId(id);
        communityExercisesRepository.deleteByCommunityId(id);
        communityMemberRepository.deleteByCommunityIdAndUserUsername(id, username);
        communityRepository.delete(community);

    }
    else
    {
        communityMemberRepository.deleteByCommunityIdAndUserUsername(id, username);
        communityActivityService.addActivity( username, ActivityTone.NEGATIVE, username + " left the community", community);
    }
}
private void findNewOwner(Long id, Community community, String leavingUsername) {
    List<CommunityMember> members =
            communityMemberRepository.findByCommunityIdOrderByRoleDescJoinedAtAsc(id);

    CommunityMember newOwner = members.stream()
            .filter(member -> !member.getUser().getUsername().equals(leavingUsername))
            .filter(member -> member.getRole() == CommunityRole.ADMIN)
            .findFirst()
            .orElse(null);

            if(newOwner == null) {
                newOwner = members.stream()
                .filter(member -> !member.getUser().getUsername().equals(leavingUsername))
                .filter(member -> member.getRole() == CommunityRole.MODERATOR)
                .findFirst()
                .orElse(null);
            }
            if(newOwner == null) {
                newOwner = members.stream()
                .filter(member -> !member.getUser().getUsername().equals(leavingUsername))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No other members found to promote to owner"));
            }

    newOwner.setRole(CommunityRole.OWNER);
    community.setOwner(newOwner.getUser());
    communityActivityService.addActivity( newOwner.getUser().getUsername(), ActivityTone.NEUTRAL, newOwner.getUser().getUsername() + " is the new owner of the community", community);
}
public List<ComMemberListDTO> getAllMembersOfCommunity(Long communityId) {
    if (!communityRepository.existsById(communityId)) {
        throw new ResourceNotFoundException("Community not found");
    }
    return communityMemberRepository.findByCommunityIdOrderByRoleDescJoinedAtAsc(communityId)
            .stream()
            .map(member -> new ComMemberListDTO(
                member.getUser().getUsername(),
                    member.getUser().getDisplayName(),
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
public void changeCommunity(CommunityChangeDTO dto , String username) {
    Community community = communityRepository.findByName(dto.name())
        .orElse(null);
    if (community == null) {
       throw new ResourceNotFoundException("Community not found");
    }
    if(!community.getOwner().getUsername().equals(username)) {
        throw new ForbiddenException("Only the owner can change the community");
    }
    community.setDescription(dto.description());
    community.setPrivate(dto.isPrivate());
    community.setJoinCode(dto.joinCode());
    communityExercisesRepository.deleteByCommunityId(community.getId());
    communityExercisesRepository.flush();
    

if(dto.exerciseIds() != null && !dto.exerciseIds().isEmpty()) {
    for (Long exerciseId : dto.exerciseIds()) {
    Exercise exercise = exerciseRepository.findById(exerciseId)
            .orElseThrow(() -> new ResourceNotFoundException("Exercise not found"));
    CommunityExercises communityExercise = new CommunityExercises(community, exercise);
    communityExercisesRepository.save(communityExercise);
}
}

communityActivityService.addActivity( username, ActivityTone.NEUTRAL, "Community updated by " + username, community);

}

@Transactional
    public void joinCommunity(CommunityJoinDTO dto, String username) { 
        User user = userRepository.findByUsername(username).orElse(null);
        Community community = communityRepository.findById(dto.communityId()).orElse(null);
        if (user == null || community == null) {throw new ResourceNotFoundException("User or community not found");
        }
        if (community.isPrivate()) {
    throw new ForbiddenException("Cannot join a private community");
}
// Check if the user is already a member of the community
        if (communityMemberRepository.existsByCommunityIdAndUserUsername((dto.communityId()), username)) {
            throw new ConflictException("User is already a member of the community");
        }  
        communityMemberRepository.save(new CommunityMember(user, community, CommunityRole.USER));
        communityActivityService.addActivity(username, ActivityTone.POSITIVE, username + " joined the community", community);
    }

    @Transactional 
    public void joinCommunityWithCode(JoinCodeDTO dto, String username){
        String communityName = dto.communityName().trim();
        String joinCode = dto.joinCode().trim();
        User user = userRepository.findByUsername(username).orElse(null);
        Community community = communityRepository.findByName(communityName).orElse(null);
        if(user == null){
            throw new ResourceNotFoundException("User not found");
        }
        if(community == null){
            throw new ResourceNotFoundException("Community not found");
        }
        if(communityMemberRepository.findByCommunityIdAndUserUsername(community.getId(), username).isPresent()){
            throw new ConflictException("User is already a member of the community");
        }
        if(!community.getJoinCode().equals(joinCode)){
            throw new ForbiddenException("Invalid join code");
        }
        communityMemberRepository.save(new CommunityMember(user, community, CommunityRole.USER));
        communityActivityService.addActivity(username, ActivityTone.POSITIVE, username + " joined the community", community);

    }

    @Transactional 
    public void kickMember(CommunityKickDTO dto, String username) {
         Community community = communityRepository.findById(dto.communityId()).orElse(null);
        if (community == null ) {
            throw new ResourceNotFoundException("Community not found ");
        }
        if(!community.getOwner().getUsername().equals(username)) {
            throw new ForbiddenException("Only the owner can kick members");
        }
        if(username.equals(dto.kickUsername())){
            throw new ConflictException("Owner cannot kick themselves");
        }
        if(!communityMemberRepository.existsByCommunityIdAndUserUsername(dto.communityId(),dto.kickUsername())) {
    throw new ResourceNotFoundException("User is not a member of this community");
}
        communityMemberRepository.deleteByCommunityIdAndUserUsername(dto.communityId(), dto.kickUsername());
        communityActivityService.addActivity(username, ActivityTone.NEGATIVE, dto.kickUsername() + " was kicked from the community by " + username, community);
        }

        @Transactional 
        public void promoteMember(RoleChangeDTO dto, String username){
            Community community = communityRepository.findById(dto.communityId()).orElse(null);
            if (community == null) {
                throw new ResourceNotFoundException("Community not found");
            }
            if (!community.getOwner().getUsername().equals(username)) {
                throw new ForbiddenException("Only the owner can promote members");
            }
            CommunityMember member = communityMemberRepository.findByCommunityIdAndUserUsername(dto.communityId(), dto.targetUsername()).orElse(null);
            if (member == null ) {
                throw new ResourceNotFoundException("Member not found");
            }
            if ( member.getRole() == CommunityRole.OWNER) {
                throw new ConflictException("Can´t promote the owner");
            }
            switch (member.getRole()) {
                case USER -> {member.setRole(CommunityRole.MODERATOR); communityActivityService.addActivity(username, ActivityTone.POSITIVE, dto.targetUsername() + " was promoted to MODERATOR by " + username, community);}
                case MODERATOR -> {member.setRole(CommunityRole.ADMIN); communityActivityService.addActivity(username, ActivityTone.POSITIVE, dto.targetUsername() + " was promoted to ADMIN by " + username, community);}
                case ADMIN, OWNER -> {
                    throw new ConflictException("Member cannot be promoted further");
                }
            }
        }

        @Transactional 
        public void demoteMember(RoleChangeDTO dto, String username){
            Community community = communityRepository.findById(dto.communityId()).orElse(null);
            if (community == null ) {
                throw new ResourceNotFoundException("Community not found");
            }
            if(!community.getOwner().getUsername().equals(username)) {
                throw new ForbiddenException("Only the owner can demote members");
            }
            CommunityMember member = communityMemberRepository.findByCommunityIdAndUserUsername(dto.communityId(), dto.targetUsername()).orElse(null);
            if (member == null ) {
                throw new ResourceNotFoundException("Member not found");
            }
            if ( member.getRole() == CommunityRole.OWNER) {
                throw new ConflictException("Can´t demote the owner");
            }
            switch (member.getRole()) {
                case MODERATOR -> {member.setRole(CommunityRole.USER); communityActivityService.addActivity(username, ActivityTone.NEGATIVE, dto.targetUsername() + " was demoted to USER by " + username, community);}
                case ADMIN -> {member.setRole(CommunityRole.MODERATOR); communityActivityService.addActivity(username, ActivityTone.NEGATIVE, dto.targetUsername() + " was demoted to MODERATOR by " + username, community);}
                case USER, OWNER -> {
                    throw new ConflictException("Member cannot be demoted further");
                }
            }}

            public RankingDTO getCommunityRanking(Long communityid, String username){
                List<UserRankingDTO> rankingList = new ArrayList<>();
                Community community = communityRepository.findById(communityid).orElseThrow(() -> new ResourceNotFoundException("Community not found."));
                if(!communityMemberRepository.existsByCommunityIdAndUserUsername(communityid, username)){
                    throw new ForbiddenException("Only Member can see the ranking!!!");
                }
                List<CommunityMember> members = communityMemberRepository.findAllByCommunityId(communityid);
                List<User> users = members.stream().map(CommunityMember -> CommunityMember.getUser()).toList();
                List<CommunityExercises> comexercises = communityExercisesRepository.findByCommunityId(communityid);
                List<Exercise> exercises = comexercises.stream().map(CommunityExercises -> CommunityExercises.getExercise()).toList();
                if (comexercises.isEmpty()) {
                        return new RankingDTO(community.getName(), List.of(), List.of());
                    }
                for(User user : users){
                    List<ExerciseRankingDTO> exList = new ArrayList<>();
                     double total = 0.0;
                    for(Exercise exercise : exercises){
                        Double oneRm = entryService.getBestOneRMForUserAndExercise(exercise.getId(), user.getUsername());
                        exList.add(new ExerciseRankingDTO(exercise.getName(), exercise.getId(), oneRm));
                         total += oneRm;
                    }
                   
                    rankingList.add(new UserRankingDTO(user.getUsername(), exList, total));
                    }
                    return new RankingDTO(community.getName(), exercises.stream().map(exercise -> new ExerciseDTO(exercise.getId(), exercise.getName())).toList(), rankingList);
            }

            public List<CommunityActivityDTO> getRecentActivitiesByCommunityId(Long communityId, String username) {
                if(!communityRepository.existsById(communityId)) {
            throw new ResourceNotFoundException("Community not found");
             }
        if(!communityMemberRepository.existsByCommunityIdAndUserUsername(communityId, username)) {
            throw new ForbiddenException("User is not a member of this community");
        }
                return communityActivityService.getRecentActivitiesByCommunityId(communityId);
            }

        }


    
    
