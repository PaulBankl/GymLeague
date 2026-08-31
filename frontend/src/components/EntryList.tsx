import { useEffect, useState } from "react";
import type { Entry } from "../types/Entry";
import * as Entryservice from "../services/Entryservice";

type EntryListProps = {
    exerciseId: string;
    refresh: number;
    onRefresh: () => void; //Callback wenn exercise gelöscht wurde, um die Liste zu aktualisieren
};





export default function EntryList({ exerciseId, refresh, onRefresh }: EntryListProps) {
    const username = sessionStorage.getItem("username");
    const [entries, setEntries] = useState<Entry[] | null>(null);
    const [error, setError] = useState(false);

    const [EditFormid, setEditFormid] = useState<number | null>(null);
    const [editWeight, setEditWeight] = useState("");
    const [editReps, setEditReps] = useState("");

    useEffect(() => {
        if (exerciseId && username) {
            Entryservice.getEntriesByExerciseIdForUser(exerciseId, username)
                .then(setEntries)
                .catch((error: Error) => {
                    console.error("Error fetching entries:", error);
                    setError(true);
                });
        }
    }, [exerciseId, refresh]); // Abhängigkeit von refresh und onEntryDeleted, damit die Liste aktualisiert wird, wenn ein Eintrag gelöscht wurde

    if (!exerciseId) {
        return <div>Invalid exercise.</div>;
    }

    if (error) {
        return <div>Server Error</div>;
    }

    if (!entries) {
        return <div>Loading Entries...</div>;
    }

    if (entries.length === 0) {
        return <div>No entries found for this exercise.</div>;
    }
    async function handleEditSubmit(entry: Entry, event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const weightNumber = Number(editWeight);
        const repsNumber = Number(editReps);
        if (weightNumber <= 0 || repsNumber <= 0) {
            alert("Weight and reps must be greater than 0.");
            return;
        }
        if (weightNumber === entry.weight && repsNumber === entry.reps) {
            alert("No changes made.");
            return;
        }
        try {
            await Entryservice.editEntry(entry.id, weightNumber, repsNumber);
            setEditFormid(null);
            setEditWeight("");
            setEditReps("");
            onRefresh(); // Refresh the list after editing
        }
        catch (error) {
            alert("Failed to edit entry.");
            console.error(error);
        }
    }
    return (
        <div>
            <h2>Entries</h2>
            {entries.map((entry) => (
                <div key={entry.id}>
                    <p>Weight: {entry.weight}</p>
                    <p>Reps: {entry.reps}</p>
                    <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
                    <button onClick={async () => {
                        try {
                            await Entryservice.deleteEntry(entry.id);
                            onRefresh();
                        } catch (error) {
                            console.error("Error deleting entry:", error);
                        }
                    }}>Delete</button>
                    <button onClick={() => {
                        if (EditFormid === entry.id) {
                            setEditFormid(null);
                            setEditWeight("");
                            setEditReps("");
                        } else {
                            setEditFormid(entry.id);
                            setEditWeight(entry.weight.toString());
                            setEditReps(entry.reps.toString());
                        }
                    }}>{EditFormid === entry.id ? "X" : "Edit"}</button>
                    {EditFormid === entry.id && <form onSubmit={(event) => handleEditSubmit(entry, event)}>
                        <label htmlFor="editWeight">Weight</label>
                        <input id="editWeight" type="number" value={editWeight} onChange={(e) => setEditWeight(e.target.value)} />
                        <label htmlFor="editReps">Reps</label>
                        <input id="editReps" type="number" value={editReps} onChange={(e) => setEditReps(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>}
                </div>
            ))}
        </div>
    );
}