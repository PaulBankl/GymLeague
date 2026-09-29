package dev.paulbankl.gymleague.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.paulbankl.gymleague.model.CommunityActivity;

public interface CommunityActivityRepository extends JpaRepository<CommunityActivity, Long> {
    
    void deleteAllByCommunityId(Long communityId);

    List<CommunityActivity> findTop20ByCommunityIdOrderByCreatedAtDesc(Long communityId);
}
