package dev.paulbankl.gymleague.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.paulbankl.gymleague.model.CommunityMember;

public interface CommunityMemberRepository extends JpaRepository<CommunityMember, Long> {
    
}
