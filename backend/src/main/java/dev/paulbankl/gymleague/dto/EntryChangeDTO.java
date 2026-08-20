package dev.paulbankl.gymleague.dto;

public class EntryChangeDTO {
    private Long id;
    private Double weight;
    private Integer reps;

    public EntryChangeDTO(Long id, Double weight, Integer reps) {
        this.id = id;
        this.weight = weight;
        this.reps = reps;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Double getWeight() {
        return weight;  
    }
    public void setWeight(Double weight) {
        this.weight = weight;
    }
    public Integer getReps() {
        return reps;
    }
    public void setReps(Integer reps) {
        this.reps = reps;
    }
}
