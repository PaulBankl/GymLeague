package dev.paulbankl.gymleague.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dev.paulbankl.gymleague.model.Community;
import dev.paulbankl.gymleague.model.User;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    public boolean existsByName(String name);
    public Optional<Community> findByName(String name);
    public Optional<Community> findById(Long id);
    

    @Query("""
        SELECT c
        FROM Community c
        WHERE c.isPrivate = false
        AND NOT EXISTS (
            SELECT 1
            FROM CommunityMember cm
            WHERE cm.community = c
            AND cm.user.username = :username
        )
        ORDER BY c.createdAt DESC
    """)
    List<Community> findDiscoverCommunities(
            @Param("username") String username,
            Pageable pageable
    );

}
