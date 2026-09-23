package dev.paulbankl.gymleague.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record EntryChangeDTO(

    @Positive (message = "ID must be positive")
    @NotNull (message = "ID cannot be null")
    Long id,

    @Positive (message = "weight must be positive")
    @NotNull (message = "weight cannot be null")
    Double weight,

    @Positive (message = "Reps must be positive")
    @NotNull (message = "Reps cannot be null")
    Integer reps
) {

}
