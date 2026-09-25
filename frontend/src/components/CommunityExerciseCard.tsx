import type { Exercise } from "../types/Exercise";


export default function CommunityExerciseCard({ exercise,checked,onChange }: { exercise: Exercise; checked: boolean; onChange: (checked: boolean) => void }) {
    return (
        <div className="flex flex-row items-center mb-4">
            <input type="checkbox" onChange={(e) => onChange(e.target.checked)} checked={checked}></input>
            <h2 className="ml-2 ">{exercise.name}</h2>
        </div>
    );
}