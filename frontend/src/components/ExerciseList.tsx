import type { Community } from "../types/Community";
import type { Exercise } from "../types/Exercise";

type ExerciseListProps = {
    community: Community;
};


export default function ExerciseList(community: ExerciseListProps) {
     const exercises = community.community.exercises;
    return (
        <>
        {exercises.length > 0 && (
                <>
                    <h2>Exercises</h2>
                    <ul>
                        {exercises.map((exercise) => (
                            <li key={exercise.id}>{exercise.name}</li>
                        ))}
                    </ul>
                </>
            )}

        </>
    )
}