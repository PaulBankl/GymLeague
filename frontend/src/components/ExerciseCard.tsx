import { Link } from "react-router-dom";
import type { Exercise } from "../types/Exercise";
import * as Entryservice from "../services/Entryservice";
import type { Entry } from "../types/Entry";
import { useEffect, useState } from "react";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
    const [bestEntry, setBestEntry] = useState<Entry | null>(null);

    function calculateOneRepMax(weight: number, reps: number): number {
        if (reps === 1) {
            return weight;
        }
        return weight * (1 + reps / 30);
    }
    useEffect(() => {
        Entryservice.getBestEntryForExercise(exercise.id).then((entry) => {
            setBestEntry(entry);
        });
    }, [exercise.id]);

    return (<>
        <div className="bg-surface-2 border border-border rounded-md p-4 mb-4 w-[80vw] md:w-[50vw] items-center flex flex-col">
            <h2>{exercise.name}</h2>
            <Link to={`/exercises/${exercise.id}`} className="text-accent underline underline-offset-4">Click for more information</Link>
            {!bestEntry && <p className="text-muted">Track to see your 1RM.</p>}
            {bestEntry && <p className="text-muted">Best Entry: {bestEntry.weight} kg x {bestEntry.reps} reps</p>}
            {bestEntry && <p className="text-muted">1RM: { calculateOneRepMax(bestEntry.weight, bestEntry.reps)?.toFixed(2) || "N/A"} kg</p>}

        </div>
    </>);
}   