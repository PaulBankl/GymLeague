package dev.paulbankl.gymleague.dto;
import java.util.List;

import jakarta.validation.constraints.*;

public record CommunityCreationDTO (

    @NotBlank 
     @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    String name,

    @Size (max = 255, message = "Description cannot exceed 255 characters")
    String description,

    boolean isPrivate,

    List<@NotNull(message = "Exercise IDs cannot be null")
    @Positive(message = "Exercise IDs must be positive") Long>
     exerciseIds,

     @NotBlank 
     @Size(min = 4, max = 10, message = "Join code must be between 4 and 10 characters")
    String joinCode

){}
