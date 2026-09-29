package dev.paulbankl.gymleague.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.dto.ResponseDTOs.CommunityActivityDTO;
import dev.paulbankl.gymleague.exception.ResourceNotFoundException;
import dev.paulbankl.gymleague.model.ActivityTone;
import dev.paulbankl.gymleague.model.Community;
import dev.paulbankl.gymleague.model.CommunityActivity;
import dev.paulbankl.gymleague.repository.CommunityActivityRepository;
import dev.paulbankl.gymleague.repository.CommunityMemberRepository;
import dev.paulbankl.gymleague.repository.CommunityRepository;
import jakarta.transaction.Transactional;

@Service
public class CommunityActivityService {
    private final CommunityActivityRepository communityActivityRepository;

    private final CommunityRepository communityRepository;


    public CommunityActivityService(CommunityActivityRepository communityActivityRepository, CommunityRepository communityRepository) {
        this.communityActivityRepository = communityActivityRepository;
        this.communityRepository = communityRepository;    }

    @Transactional
    public void deleteActivitiesByCommunityId(Long communityId) {
        communityActivityRepository.deleteAllByCommunityId(communityId);
    }
    public void addActivity(String username, ActivityTone tone, String message, Community community) {
        CommunityActivity activity = new CommunityActivity(username, tone, message, community);
        communityActivityRepository.save(activity);
    }
    public void addActivityByCommunityId(Long communityId, String username, ActivityTone tone, String message) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new ResourceNotFoundException("Community not found"));
        addActivity(username, tone, message, community);
    }

    public List<CommunityActivityDTO> getRecentActivitiesByCommunityId(Long communityId) {

        List<CommunityActivity> activities = communityActivityRepository.findTop20ByCommunityIdOrderByCreatedAtDesc(communityId);
        return activities.stream().map(activity -> new CommunityActivityDTO(
            activity.getId(),
            activity.getUsername(),
            activity.getMessage(),
            activity.getCreatedAt(),
            activity.getTone()
        )).toList();
    }

}

