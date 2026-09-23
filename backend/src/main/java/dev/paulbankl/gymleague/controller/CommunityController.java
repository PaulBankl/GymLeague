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
    public boolean postMethodName(@Valid @RequestBody CommunityCreationDTO dto, Authentication authentication) {
        return communityService.createCommunity(dto, authentication.getName());
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
    public boolean leaveCommunity(@PathVariable Long id, Authentication authentication) {
        return communityService.leaveCommunity(id, authentication.getName());
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
    public boolean changeCommunity(@Valid @RequestBody CommunityChangeDTO dto, Authentication authentication) {
       return communityService.changeCommunity(dto, authentication.getName());
    }
    @PostMapping("/join")
    public boolean joinCommunity(@Valid @RequestBody CommunityJoinDTO dto, Authentication authentication) {
        return communityService.joinCommunity(dto, authentication.getName());
    }
    @PostMapping("/kick")
    public boolean kickMember(@Valid @RequestBody CommunityKickDTO dto, Authentication authentication) {
        return communityService.kickMember(dto, authentication.getName());
    }
    @PostMapping("/promote")
    public boolean promoteMember(@Valid @RequestBody RoleChangeDTO dto, Authentication authentication) {
        return communityService.promoteMember(dto, authentication.getName());
    }
    @PostMapping("/demote")
    public boolean demoteMember(@Valid @RequestBody RoleChangeDTO dto, Authentication authentication) {
        return communityService.demoteMember(dto, authentication.getName());
    }
    
    
    
    
         
}
