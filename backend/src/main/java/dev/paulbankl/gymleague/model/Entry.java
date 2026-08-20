package dev.paulbankl.gymleague.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "entries")
public class Entry {

    public Entry(double weight, int reps, User user, Exercise exercise) {
        this.weight = weight;
        this.reps = reps;
        this.user = user;
        this.exercise = exercise;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Setter
    @Column(nullable = false)
    private double weight;

    @Setter
    @Column(nullable = false)
    private int reps;

    private LocalDateTime date;


    @PrePersist
    public void prePersist() {
        date = LocalDateTime.now();
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
        Entry other = (Entry) obj;

        return id != null && id.equals(other.id);
    }
}
