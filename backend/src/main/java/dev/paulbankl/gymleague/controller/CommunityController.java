package dev.paulbankl.gymleague.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.service.CommunityMemberService;
import dev.paulbankl.gymleague.service.CommunityService;

import java.util.List;

import dev.paulbankl.gymleague.dto.CommunityChangeDTO;
import dev.paulbankl.gymleague.dto.CommunityCreationDTO;
import dev.paulbankl.gymleague.dto.CommunityJoinDTO;
import dev.paulbankl.gymleague.dto.CommunityKickDTO;
import dev.paulbankl.gymleague.dto.RoleChangeDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.ComMemberListDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityDetailDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityOverviewDTO;
import dev.paulbankl.gymleague.model.Community;
import dev.paulbankl.gymleague.model.CommunityMember;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("api/community")
public class CommunityController {
    private final CommunityService communityService;
    private final CommunityMemberService communityMemberService;

    public CommunityController(CommunityService communityService, CommunityMemberService communityMemberService) {
        this.communityService = communityService;
        this.communityMemberService = communityMemberService;
    }
    @GetMapping("")
    public List<CommunityMember> getMembers() {
        return communityMemberService.getAll();
    }
    @PostMapping("create")
    public boolean postMethodName(@RequestBody CommunityCreationDTO dto) {
        return communityService.createCommunity(dto);
    }
    @GetMapping("/all")
    public List<CommunityOverviewDTO> getAllCommunitiesForUser(@RequestParam String username) {       
        return communityService.getAllCommunitiesForUser(username);     
        }

    @GetMapping("/{id}")
    public CommunityDetailDTO getCommunityDetails(@PathVariable Long id) {
        return  communityService.getCommunityDetails(id);
    }
    @GetMapping("/leave/{id}")
    public boolean leaveCommunity(@PathVariable Long id, @RequestParam String username) {
        return communityService.leaveCommunity(id, username);
    }
    @GetMapping("/members/{id}")
    public List<ComMemberListDTO> getAllMembersOfCommunity(@PathVariable Long id) {
        return communityService.getAllMembersOfCommunity(id);
    }
    @GetMapping("/random")
    public List<CommunityOverviewDTO> getrandomCommunities(@RequestParam String username) {
        return communityService.get10RandomCommunities(username);
    }
    @PostMapping("/change")
    public boolean changeCommunity(@RequestBody CommunityChangeDTO dto) {
       return communityService.changeCommunity(dto);
    }
    @PostMapping("/join")
    public boolean joinCommunity(@RequestBody CommunityJoinDTO dto) {
        return communityService.joinCommunity(dto);
    }
    @PostMapping("/kick")
    public boolean kickMember(@RequestBody CommunityKickDTO dto) {
        return communityService.kickMember(dto);
    }
    @PostMapping("/promote")
    public boolean promoteMember(@RequestBody RoleChangeDTO dto) {
        return communityService.promoteMember(dto);
    }
    @PostMapping("/demote")
    public boolean demoteMember(@RequestBody RoleChangeDTO dto) {
        return communityService.demoteMember(dto);
    }
    
    
    
    
         
}
