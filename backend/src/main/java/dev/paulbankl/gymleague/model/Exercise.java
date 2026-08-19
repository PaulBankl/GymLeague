package dev.paulbankl.gymleague.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Exercise {
    public Exercise(String name) {
        this.name = name;
    }
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

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
        Exercise other = (Exercise) obj;

        return id != null && id.equals(other.id);
    }
}
