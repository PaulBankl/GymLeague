package dev.paulbankl.gymleague.dto.ResponseDTOs;

import java.util.List;

public record RankingDTO (
    String communityName,
    List<ExerciseDTO> exercises,
    List<UserRankingDTO> userRankings
) {
}