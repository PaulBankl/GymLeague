package dev.paulbankl.gymleague.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "community_exercises")
public class CommunityExercises {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    public CommunityExercises(Community community, Exercise exercise) {
        this.community = community;
        this.exercise = exercise;
    }
    
    @Setter
    @ManyToOne
    @JoinColumn(name="community_id", nullable = false)
    private Community community;
    
    @Setter
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
