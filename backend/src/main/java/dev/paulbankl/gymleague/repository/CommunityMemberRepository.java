package dev.paulbankl.gymleague.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.paulbankl.gymleague.model.CommunityMember;
import dev.paulbankl.gymleague.model.CommunityRole;

public interface CommunityMemberRepository extends JpaRepository<CommunityMember, Long> {
    public List<CommunityMember> findAllByCommunityId(Long communityId);
    public List<CommunityMember> findAllByUserId(Long userId);
    List<CommunityMember> findByUserUsername(String username);
    Optional<CommunityMember> findByCommunityIdAndRole(
        Long communityId,
        CommunityRole role
);
public int countByCommunityId(Long communityId);
}
