package dev.paulbankl.gymleague.dto;

public class EntryCreationDTO {
    private Long exerciseId;
    private int weight;
    private int reps;

    public EntryCreationDTO( Long exerciseId, int weight, int reps) {
        
        this.exerciseId = exerciseId;
        this.weight = weight;
        this.reps = reps;
    }


    public Long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(Long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }
}
