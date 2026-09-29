package dev.paulbankl.gymleague.dto.ResponseDTOs;




public record ExerciseInfoDTO (
    Integer entryCount,
    EntryDTO bestEntry,
    Double progressPercent,
    Double progressOneRm
){}
