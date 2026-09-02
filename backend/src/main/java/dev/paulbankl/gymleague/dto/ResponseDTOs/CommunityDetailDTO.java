package dev.paulbankl.gymleague.dto.ResponseDTOs;

import java.time.LocalDateTime;

public record CommunityDetailDTO(
    String name,
    String description,
    String owner,
    int memberCount,
    LocalDateTime createdAt,
    boolean isPrivate
) {}