package dev.paulbankl.gymleague.dto.ResponseDTOs;



public record CommunityOverviewDTO(
    Long id,
    String name,
    String description,
    boolean isPrivate,
    String createdAt,
    String owner,
    int memberCount
) {
}
