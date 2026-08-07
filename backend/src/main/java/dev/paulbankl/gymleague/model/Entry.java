package dev.paulbankl.gymleague.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Entry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // private UserModel user;
    // private ExerciseModel exercise;
    private double weight;
    private int reps;
    private LocalDateTime date;

    public Entry(double weight, int reps) {
        this.weight = weight;
        this.reps = reps;
        this.date = LocalDateTime.now();
    }
    public Entry (){
        this.date = LocalDateTime.now();
    }
    public Long getId() {
        return id;
    }
    public void setWeight(double weight) {
        this.weight = weight;
    }
    public double getWeight() {
        return weight;
    }
    public void setReps(int reps) {
        this.reps = reps;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        long temp;
        temp = Double.doubleToLongBits(weight);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + reps;
        result = prime * result + ((date == null) ? 0 : date.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Entry other = (Entry) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (Double.doubleToLongBits(weight) != Double.doubleToLongBits(other.weight))
            return false;
        if (reps != other.reps)
            return false;
        if (date == null) {
            if (other.date != null)
                return false;
        } else if (!date.equals(other.date))
            return false;
        return true;
    }
    public int getReps() {
        return reps;
    }
    public LocalDateTime getDate() {
        return date;
    }
}
