import { useState } from "react";
import * as Entryservice from "../services/Entryservice";

type EntryFormProps = {
    exerciseId: string;
    exerciseName: string;
};

export default function EntryForm({ exerciseId, exerciseName }: EntryFormProps) {
    const username = sessionStorage.getItem("username");
    const [weight, setWeight] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(exerciseName);
        if (weight <= 0 || reps <= 0) {
            alert("Weight and reps must be greater than 0.");
            return;
        }
        if (username) {
            const success = await Entryservice.addEntryForUser(exerciseId, username, exerciseName, weight, reps);
            if (success) {
                alert("Entry added successfully.");
                setWeight(0);
                setReps(0);
            } else {
                alert("Failed to add entry.");
            }
        } else {
            alert("User not logged in.");
        }
    }
    return (<div>
        <button onClick={() => { showForm ? setShowForm(false) : setShowForm(true) }}>{showForm ? "X" : "Add Entry"}</button>
        {showForm && <p>Add Entry for {exerciseName}</p> && <form onSubmit={handleSubmit}>
            <label htmlFor="weight">Weight</label>
            <input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value === "" ? 0 : Number(e.target.value))} />
            <label htmlFor="reps">Reps</label>
            <input id="reps" type="number" value={reps} onChange={(e) => setReps(e.target.value === "" ? 0 : Number(e.target.value))} />
            <button type="submit">Submit</button>
        </form>}
    </div>)
}
