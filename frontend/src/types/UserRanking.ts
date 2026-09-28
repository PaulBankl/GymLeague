export type UserRanking = {
    username: string,
    Exercises: ExerciseRanking [],
    total: number
}

type ExerciseRanking = {
    exerciseName: string,
    exerciseId: number,
    OneRM: number
}