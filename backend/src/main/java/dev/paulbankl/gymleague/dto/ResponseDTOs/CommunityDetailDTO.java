package dev.paulbankl.gymleague.dto.ResponseDTOs;

import java.time.LocalDateTime;




public record CommunityDetailDTO(
    Long id,
    String name,
    String description,
    String owner,
    int memberCount,
    LocalDateTime createdAt,
    boolean isPrivate,
    ExerciseDTO[] exercises,
    String joinCode
) {}