package dev.paulbankl.gymleague.dto.ResponseDTOs;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * ExerciseDTO
 */
public record ExerciseDTO(
    Long id,
    String name
) {

}
