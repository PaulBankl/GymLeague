package dev.paulbankl.gymleague.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.service.AuthService;
import dev.paulbankl.gymleague.service.CommunityMemberService;
import dev.paulbankl.gymleague.service.CommunityService;
import jakarta.validation.Valid;

import java.util.List;

import dev.paulbankl.gymleague.dto.CommunityChangeDTO;
import dev.paulbankl.gymleague.dto.CommunityCreationDTO;
import dev.paulbankl.gymleague.dto.CommunityJoinDTO;
import dev.paulbankl.gymleague.dto.CommunityKickDTO;
import dev.paulbankl.gymleague.dto.RoleChangeDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.ComMemberListDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityDetailDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityOverviewDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;





@RestController
@RequestMapping("api/community")
public class CommunityController {
    private final CommunityService communityService;
    private final CommunityMemberService communityMemberService;

    public CommunityController(CommunityService communityService, CommunityMemberService communityMemberService) {
        this.communityService = communityService;
        this.communityMemberService = communityMemberService;
    }

    @PostMapping("create")
    public ResponseEntity<Void> postMethodName(@Valid @RequestBody CommunityCreationDTO dto, Authentication authentication) {
        communityService.createCommunity(dto, authentication.getName());
        return ResponseEntity.status(201).build();
    }
    @GetMapping("/all")
    public List<CommunityOverviewDTO> getAllCommunitiesForUser(Authentication authentication) {       
        return communityService.getAllCommunitiesForUser(authentication.getName());     
        }

    @GetMapping("/{id}")
    public CommunityDetailDTO getCommunityDetails(@PathVariable Long id) {
        return  communityService.getCommunityDetails(id);
    }
    @PostMapping("/leave/{id}")
    public ResponseEntity<Void> leaveCommunity(@PathVariable Long id, Authentication authentication) {
        communityService.leaveCommunity(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/members/{id}")
    public List<ComMemberListDTO> getAllMembersOfCommunity(@PathVariable Long id) {
        return communityService.getAllMembersOfCommunity(id);
    }
    @GetMapping("/random")
    public List<CommunityOverviewDTO> getrandomCommunities(Authentication authentication) {
        return communityService.get10RandomCommunities(authentication.getName());
    }
    @PostMapping("/change")
    public ResponseEntity<Void> changeCommunity(@Valid @RequestBody CommunityChangeDTO dto, Authentication authentication) {
       communityService.changeCommunity(dto, authentication.getName());
       return ResponseEntity.noContent().build();
    }
    @PostMapping("/join")
    public ResponseEntity<Void> joinCommunity(@Valid @RequestBody CommunityJoinDTO dto, Authentication authentication) {
        communityService.joinCommunity(dto, authentication.getName());
        return ResponseEntity.status(201).build();
    }
    @PostMapping("/kick")
    public ResponseEntity<Void> kickMember(@Valid @RequestBody CommunityKickDTO dto, Authentication authentication) {
        communityService.kickMember(dto, authentication.getName());
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/promote")
    public ResponseEntity<Void> promoteMember(@Valid @RequestBody RoleChangeDTO dto, Authentication authentication) {
        communityService.promoteMember(dto, authentication.getName());
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/demote")
    public ResponseEntity<Void> demoteMember(@Valid @RequestBody RoleChangeDTO dto, Authentication authentication) {
        communityService.demoteMember(dto, authentication.getName());
        return ResponseEntity.noContent().build();
    }
    
    
    
    
         
}
