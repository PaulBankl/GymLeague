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
        <div className="flex flex-col items-center mx-auto h-screen mt-[2vw] w-[80vw] md:w-[50vw]">
            <Link to="/app" className="text-accent underline underline-offset-4 self-start">Back to Dashboard</Link>
            <h1 className="font-heading text-[clamp(22px,10vw,72px)] text-center font-black tracking-[-2px]">Exercise Overview</h1>
            {exercises.length === 0 ? <p>No exercises found.</p> : (exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
            )))}
        </div>
    );
}