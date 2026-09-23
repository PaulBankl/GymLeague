package dev.paulbankl.gymleague.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateDisplayNameDTO(

    @NotBlank (message = "Display name cannot be blank")
    @Size (min = 3, max = 20, message = "Display name must be between 3 and 20 characters")
    String displayName
) {
    
}
