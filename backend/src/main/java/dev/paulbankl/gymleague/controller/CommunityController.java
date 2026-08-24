package dev.paulbankl.gymleague.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.service.CommunityMemberService;
import dev.paulbankl.gymleague.service.CommunityService;

import java.util.List;

import dev.paulbankl.gymleague.dto.CommunityCreationDTO;
import dev.paulbankl.gymleague.model.Community;
import dev.paulbankl.gymleague.model.CommunityMember;

import org.springframework.web.bind.annotation.GetMapping;
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
    @GetMapping("")
    public List<CommunityMember> getMethodName() {
        return communityMemberService.getAll();
    }
    @PostMapping("create")
    public boolean postMethodName(@RequestBody CommunityCreationDTO dto) {
        
        return communityService.createCommunity(dto);
    }
    
    
    
}
