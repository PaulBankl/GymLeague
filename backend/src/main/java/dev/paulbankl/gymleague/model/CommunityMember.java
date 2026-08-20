package dev.paulbankl.gymleague.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Table(name = "community_members",uniqueConstraints = {
    @jakarta.persistence.UniqueConstraint(columnNames = {"user_id", "community_id"})
})
@Entity
public class CommunityMember {
    public CommunityMember(User user, Community community, CommunityRole role) {
        this.user = user;
        this.community = community;
        this.role = role;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "community_id", nullable = false)
    private Community community;

    @Enumerated(EnumType.STRING)
    @Setter
    @Column(nullable = false)
    private CommunityRole role;

    @Column(nullable = false)
    private LocalDateTime joinedAt;

    @PrePersist
    public void prePersist() {
        joinedAt = LocalDateTime.now();
    }
    @Override 
    public int hashCode() {
         return getClass().hashCode();
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        CommunityMember other = (CommunityMember) obj;

        return id != null && id.equals(other.id);
    }
}
