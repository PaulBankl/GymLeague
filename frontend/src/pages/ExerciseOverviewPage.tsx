import { useEffect, useState } from "react";
import type { Exercise } from "../types/Exercise";
import * as Exerciseservice from "../services/Exerciseservice";
import ExerciseCard from "../components/ExerciseCard";
import { Link } from "react-router-dom";

export default function ExerciseOverviewPage() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        Exerciseservice.getExercises().then(setExercises).catch((error) => {
            console.error("Error fetching exercises:", error);
            setError(true);
        });
    }, []);
    if(error) {
            return <div>Server Error</div>;
        }
    return (
        <div>
            <Link to="/app">Back to Dashboard</Link>
            <h1>Exercise Overview</h1>
            {exercises.length === 0 ? <p>No exercises found.</p> : (exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
            )))}
        </div>
    );
}