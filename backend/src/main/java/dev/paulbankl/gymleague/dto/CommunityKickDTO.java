package dev.paulbankl.gymleague.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CommunityKickDTO (

    @Positive (message = "Community ID must be positive")
    @NotNull (message = "Community ID is required")
    Long communityId,

    @NotBlank(message = "Kick username is required")
    String kickUsername
){

}
