package dev.paulbankl.gymleague.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.paulbankl.gymleague.model.CommunityMember;

public interface CommunityMemberRepository extends JpaRepository<CommunityMember, Long> {
    public List<CommunityMember> findAllByCommunityId(Long communityId);
    public List<CommunityMember> findAllByUserId(Long userId);
}
