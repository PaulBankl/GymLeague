package dev.paulbankl.gymleague.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record RoleChangeDTO(

    @Positive (message = "Community ID must be positive")
    @NotNull (message = "Community ID is required")
    Long communityId,

    @NotBlank (message = "Target username is required")
    String  targetUsername
) {
}