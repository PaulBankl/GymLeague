package dev.paulbankl.gymleague.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class CommunityExercises {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name="community_id", nullable = false)
    private Community community;
    
    @ManyToOne
    @JoinColumn(name="exercise_id", nullable = false)
    private Exercise exercise;

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
        CommunityExercises other = (CommunityExercises) obj;

        return id != null && id.equals(other.id);
    }
}
