package dev.paulbankl.gymleague.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record JoinCodeDTO(

    @NotBlank(message = "Join code is required")
    @Size(min = 4, max = 10, message = "Join code must be between 4 and 10 characters")
    String joinCode,

    @NotBlank (message = "Community name is required")
    @Size (min = 3, max = 50, message = "Community name must be between 3 and 50 characters")
    String communityName

) {}