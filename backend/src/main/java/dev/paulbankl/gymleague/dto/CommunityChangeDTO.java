package dev.paulbankl.gymleague.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record CommunityChangeDTO (

    @NotBlank 
    @Size (min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    String name,

    @Size (max = 255, message = "Description cannot exceed 255 characters")
    String description,

    boolean isPrivate,

    @Size(min = 4, max = 10, message = "Join code must be between 4 and 10 characters")
    String joinCode,

    List< @Positive @NotNull Long> exerciseIds
){}
