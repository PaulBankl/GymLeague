import type { Exercise } from "../types/Exercise";


export default function CommunityExerciseCard({ exercise,checked,onChange }: { exercise: Exercise; checked: boolean; onChange: (checked: boolean) => void }) {
    return (
        <div>
            <h2>{exercise.name}</h2>
            <input type="checkbox" onChange={(e) => onChange(e.target.checked)} checked={checked}></input>
        </div>
    );
}