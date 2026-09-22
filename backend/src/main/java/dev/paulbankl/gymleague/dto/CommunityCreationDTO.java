package dev.paulbankl.gymleague.dto;

public class CommunityCreationDTO {
    private String name;
    private String description;
    private boolean isPrivate;
    private Long[] exerciseIds;

    public CommunityCreationDTO(String name, String description, boolean isPrivate) {
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public boolean isPrivate() {
        return isPrivate;
    }
    public void setPrivate(boolean isPrivate) {
        this.isPrivate = isPrivate;
    }
    public Long[] getExerciseIds() {
        return exerciseIds;
    }
    public void setExerciseIds(Long[] exerciseIds) {
        this.exerciseIds = exerciseIds;}
}
