package dev.paulbankl.gymleague.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.service.CommunityMemberService;
import dev.paulbankl.gymleague.service.CommunityService;

import java.util.List;

import dev.paulbankl.gymleague.dto.CommunityCreationDTO;
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
@CrossOrigin(origins = "http://localhost:5173")
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
    
    
         
}
