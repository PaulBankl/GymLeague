package dev.paulbankl.gymleague.dto.ResponseDTOs;

import java.time.LocalDateTime;

import dev.paulbankl.gymleague.model.ActivityTone;

public record CommunityActivityDTO(
    Long id,
    String username,
    String message,
    LocalDateTime createdAt,
    ActivityTone tone
) {
    
}
