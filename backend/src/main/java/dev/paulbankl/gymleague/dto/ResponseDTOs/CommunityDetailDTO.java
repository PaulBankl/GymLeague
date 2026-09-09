package dev.paulbankl.gymleague.dto.ResponseDTOs;

import java.time.LocalDateTime;

import dev.paulbankl.gymleague.model.Exercise;



public record CommunityDetailDTO(
    String name,
    String description,
    String owner,
    int memberCount,
    LocalDateTime createdAt,
    boolean isPrivate,
    Exercise[] exercises
) {}