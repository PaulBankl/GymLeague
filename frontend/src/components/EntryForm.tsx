import { useState } from "react";
import * as Entryservice from "../services/Entryservice";

type EntryFormProps = {
    exerciseId: string;
    exerciseName: string;
    onEntryAdded: () => void;
};

export default function EntryForm({  exerciseId, exerciseName, onEntryAdded }: EntryFormProps) {
    const username = sessionStorage.getItem("username");
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const weightNumber = Number(weight);
        const repsNumber = Number(reps);
        if (weightNumber <= 0 || repsNumber <= 0) {
            alert("Weight and reps must be greater than 0.");
            return;
        }
        if (username) {
            try {
                const success = await Entryservice.addEntryForUser( username, Number(exerciseId), weightNumber, repsNumber);
                if (success) {
                    alert("Entry added successfully.");
                    setWeight("");
                    setReps("");
                    onEntryAdded(); // Call the callback to refresh the entry list
                } else {
                    alert("Failed to add entry.");
                }
            } catch (error) {
                alert("Failed to add entry.");
                console.error(error);
            }
        } else {
            alert("User not logged in.");
        }
    }
    return (<div>
        <button onClick={() => { setShowForm(!showForm) }}>{showForm ? "X" : "Add Entry"}</button>
        {showForm && <form onSubmit={handleSubmit}>
            <p>Add Entry for {exerciseName}</p>
            <label htmlFor="weight">Weight</label>
            <input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <label htmlFor="reps">Reps</label>
            <input id="reps" type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
            <button type="submit">Submit</button>
        </form>}
    </div>)
}
