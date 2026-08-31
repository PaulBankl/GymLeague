import { Link } from "react-router-dom";
import type { Exercise } from "../types/Exercise";
import "../styles/ExerciseCard.css";
import * as Entryservice from "../services/Entryservice";
import type { Entry } from "../types/Entry";
import { useEffect, useState } from "react";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
    const username = sessionStorage.getItem("username");
    const [bestEntry, setBestEntry] = useState<Entry | null>(null);
    if (!username) {
        return <div>Please log in to view exercises.</div>;
    }

    function calculateOneRepMax(weight: number, reps: number): number {
        if (reps === 1) {
            return weight;
        }
        return weight * (1 + reps / 30);
    }
    useEffect(() => {
        Entryservice.getBestEntryForExercise(exercise.id, username).then((entry) => {
            setBestEntry(entry);
        });
    }, [exercise.id, username]);

    return (<>
        <div className="exercise-card">
            <h2>{exercise.name}</h2>
            <Link to={`/exercises/${exercise.id}`}>Click for more information</Link>
            {!bestEntry && <p>Track to see your 1RM.</p>}
            {bestEntry && <p>Best Entry: {bestEntry.weight} kg x {bestEntry.reps} reps</p>}
            {bestEntry && <p>1RM: { calculateOneRepMax(bestEntry.weight, bestEntry.reps)?.toFixed(2) || "N/A"} kg</p>}

        </div>
    </>);
}   