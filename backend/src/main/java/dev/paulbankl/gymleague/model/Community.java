package dev.paulbankl.gymleague.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
public class Community {

    public Community(String name, String description, boolean isPrivate) {
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String CommunityId;

    @Column( unique = true, nullable = false)
    private String name;

    @Setter
    @Column(length = 255)
    private String description;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Setter
    @Column(nullable = false)
    private boolean isPrivate;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
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
        Community other = (Community) obj;

        return CommunityId != null && CommunityId.equals(other.CommunityId);
    }
}
