package dev.paulbankl.gymleague.dto;

public record CommunityChangeDTO (
    String name,
    String description,
    boolean isPrivate,
    Long []exerciseIds
){}
