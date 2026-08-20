package dev.paulbankl.gymleague.dto;

public class EntryCreationDTO {
    private String username;
    private String exerciseName;
    private int weight;
    private int reps;

    public EntryCreationDTO(String username, String exerciseName, int weight, int reps) {
        this.username = username;
        this.exerciseName = exerciseName;
        this.weight = weight;
        this.reps = reps;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public void setExerciseName(String exerciseName) {
        this.exerciseName = exerciseName;
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
