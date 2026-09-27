package dev.paulbankl.gymleague.dto.ResponseDTOs;

import java.util.List;

public record UserRankingDTO(
    String username,
    List<ExerciseRankingDTO> Exercises,
    Double total
)

{
}




