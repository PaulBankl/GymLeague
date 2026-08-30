import { useEffect, useState } from "react";
import type { Exercise } from "../types/Exercise";
import * as Exerciseservice from "../services/Exerciseservice";
import type { Entry } from "../types/Entry";
import * as Entryservice from "../services/Entryservice";
import { useParams } from "react-router-dom";
import EntryForm from "../components/EntryForm";





export default function ExerciseDetailPage({ }) {
    const { id } = useParams();
    const username = sessionStorage.getItem("username");
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [entries, setEntries] = useState<Entry[] | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            Exerciseservice.getExerciseById(id)
                .then(setExercise)
                .catch((error: Error) => {
                    console.error("Error fetching exercise:", error);
                    setError(true);
                });
        }
        if (id && username) {
            Entryservice.getEntriesByExerciseIdForUser(id, username)
                .then(setEntries)
                .catch((error: Error) => {
                    console.error("Error fetching entries:", error);
                    setError(true);
                });
        }
    }, []);
    if (!id) {
        return <div>Invalid exercise.</div>;
    }

    if (error) {
        return <div>Server Error</div>;
    }

    if (!exercise) {
        return <div>Loading...</div>;
    }
    if (!entries) {
        return <div>Loading Entries...</div>;
    }

    return (
        <div>
            <h1>{exercise.name}</h1>
            <EntryForm exerciseId={id} exerciseName={exercise.name}></EntryForm>
        </div>
    );
}