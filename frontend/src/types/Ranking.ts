import type { Exercise } from "./Exercise"
import type { UserRanking } from "./UserRanking"


export type Ranking = {
    communityName: string,
    exercises: Exercise[],
    userRankings: UserRanking[]
}


