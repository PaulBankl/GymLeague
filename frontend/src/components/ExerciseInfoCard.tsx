import { useEffect, useState } from "react";
import "../styles/ExerciseInfoCard.css";
import type { Entry } from "../types/Entry";
import * as Exerciseservice from "../services/Exerciseservice";

export default function ExerciseInfoCard({ id, refresh }: { id: string, refresh: number }) {
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<{ entryCount: number; bestEntry: Entry | null; progressPercent: number; progressOneRm: number } | null>(null);


    if (!id) {
        return (<div>Invalid exercise.</div>);
    }
    useEffect(() => {
        Exerciseservice.getExerciseInfoById(id)
            .then(setInfo)
            .catch((error: Error) => {
                console.error("Error fetching exercise info:", error);
                setError(error.message);
            });
    }, [id,  refresh]);
    if (error) {
        return (<div>Error Loading stats</div>);
    }
    return (
        <div className="exercise-info-card">
            Exercise Stats
            {info && (
                <div>
                    <p>Entries: {info.entryCount}</p>
                    {info.bestEntry && (
                        <p>Best Entry: {info.bestEntry.weight} kg x {info.bestEntry.reps} reps</p>
                    )}
                    <p>Progress: {info.progressPercent.toFixed(2)}%</p>
                    <p>1RM Progress: {info.progressOneRm.toFixed(2)} kg</p>
                </div>
            )}
        </div>
    );
}