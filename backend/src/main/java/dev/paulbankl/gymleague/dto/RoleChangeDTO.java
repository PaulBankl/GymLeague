package dev.paulbankl.gymleague.dto;

public record RoleChangeDTO(
    Long communityId,
    String ownerName,
    String username
) {
}