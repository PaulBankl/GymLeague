import { Link } from "react-router-dom";
import type { Exercise } from "../types/Exercise";
import "../styles/ExerciseCard.css";


export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
    return (<>
        <div className="exercise-card">
            <h2>{exercise.name}</h2>
            <Link to={`/exercises/${exercise.id}`}>Click for more information</Link>
        </div>
    </>);
}   