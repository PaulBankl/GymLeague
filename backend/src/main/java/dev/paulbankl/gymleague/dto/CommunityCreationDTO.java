package dev.paulbankl.gymleague.dto;

public class CommunityCreationDTO {
    private String name;
    private String description;
    private boolean isPrivate;
    private String username;

    public CommunityCreationDTO(String name, String description, boolean isPrivate, String username) {
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;
        this.username = username;
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
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
}
