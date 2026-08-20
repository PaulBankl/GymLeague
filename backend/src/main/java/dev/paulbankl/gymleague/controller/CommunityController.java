package dev.paulbankl.gymleague.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.service.CommunityService;

@RestController
@RequestMapping("api/community")
public class CommunityController {
    private final CommunityService communityService;

    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }
}
