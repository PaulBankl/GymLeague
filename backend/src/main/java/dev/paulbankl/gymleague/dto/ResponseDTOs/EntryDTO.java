package dev.paulbankl.gymleague.dto.ResponseDTOs;

public record EntryDTO(
    Long id,
    double weight,
    int reps,
    String username,
    String exercisename,
    String createdAt
) {
}
