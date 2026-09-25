import { useState } from "react";
import * as Entryservice from "../services/Entryservice";

type EntryFormProps = {
    exerciseId: string;
    exerciseName: string;
    onEntryAdded: () => void;
};

export default function EntryForm({ exerciseId, exerciseName, onEntryAdded }: EntryFormProps) {
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
                const success = await Entryservice.addEntryForUser(Number(exerciseId), weightNumber, repsNumber);
                if (success) {
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
        {!showForm && <button className="bg-accent border border-border rounded-md p-2 pl-4 pr-4 hover:bg-accent-dim " onClick={() => { setShowForm(!showForm) }}>{showForm ? "X" : "Add Entry"}</button>}
        {showForm && <form onSubmit={handleSubmit} className=" bg-surface border  border-border rounded-md p-2 mb-4 w-[80vw] md:w-[40vw]">
            <div className="flex flex-row justify-between  mt-4 mb-4 ">
                <p className="font-heading">Add Entry for {exerciseName}</p>
                <button type="button" onClick={() => { setShowForm(!showForm) }} className="text-muted bg-surface-2 rounded-md p-1 pl-2 pr-2">X</button>
            </div>
            <div className=" flex flex-col justify-between md:flex-row ">
            <div>
                <label htmlFor="weight" className="text-muted">Weight</label>
                <input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-surface-2 border border-border max-w-[70%] rounded-md p-2 mb-4" />
            </div>
            <div>
                <label htmlFor="reps" className="text-muted">Reps</label>
                <input id="reps" type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="bg-surface-2 border border-border max-w-[70%] rounded-md p-2 mb-4" />
            </div>
            <button type="submit" className="bg-accent border border-border rounded-md p-2 mb-4  hover:bg-accent-dim  min-w-[100px] ">Submit</button>
            </div>
        </form>}
    </div>)
}
