package dev.paulbankl.gymleague.dto.ResponseDTOs;

import dev.paulbankl.gymleague.model.Entry;


public record ExerciseInfoDTO (
    Integer entryCount,
    Entry bestEntry,
    Double progressPercent,
    Double progressOneRm
){}
