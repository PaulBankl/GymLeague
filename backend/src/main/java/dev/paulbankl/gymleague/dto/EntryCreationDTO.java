package dev.paulbankl.gymleague.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record EntryCreationDTO(

    @NotNull (message = "Exercise ID cannot be null")
    @Positive (message = "Exercise ID must be positive")
    Long exerciseId,

    @Positive (message = "Weight must be positive")
    @NotNull (message = "Weight cannot be null")
    Double weight,
    

    @Positive (message = "Reps must be positive")
    @NotNull(message = "Reps cannot be null")
    Integer reps
) {

}
