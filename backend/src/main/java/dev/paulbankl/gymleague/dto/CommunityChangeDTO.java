package dev.paulbankl.gymleague.dto;

public record CommunityChangeDTO (
    Long id,
    String description,
    boolean isPrivate
){}
