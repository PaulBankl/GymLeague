package dev.paulbankl.gymleague.dto.ResponseDTOs;

import java.time.LocalDateTime;

import dev.paulbankl.gymleague.model.Exercise;



public record CommunityDetailDTO(
    Long id,
    String name,
    String description,
    String owner,
    int memberCount,
    LocalDateTime createdAt,
    boolean isPrivate,
    Exercise[] exercises,
    String joinCode
) {}