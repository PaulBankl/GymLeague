package dev.paulbankl.gymleague.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CommunityJoinDTO(

    @Positive (message = "Community ID must be positive")
    @NotNull(message = "Community ID is required")
    Long communityId
) {
    
}
