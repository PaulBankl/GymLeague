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
    const [error, setError] = useState<String | null>(null);
    const [loading, setLoading] = useState(true);

    const [EditFormid, setEditFormid] = useState<number | null>(null);
    const [editWeight, setEditWeight] = useState("");
    const [editReps, setEditReps] = useState("");

    useEffect(() => {
        if (exerciseId && username) {
            Entryservice.getEntriesByExerciseIdForUser(exerciseId)
                .then(setEntries).then(() => setLoading(false))
                .catch((error: Error) => {
                    console.error("Error fetching entries:", error);
                    setError(error.message);
                })
                
        }
    }, [exerciseId, refresh]); // Abhängigkeit von refresh und onEntryDeleted, damit die Liste aktualisiert wird, wenn ein Eintrag gelöscht wurde

    if (!exerciseId) {
        return <div>Invalid exercise.</div>;
    }

    if (!entries) {
        return <div>Loading Entries...</div>;
    }

    function calculateOneRM(weight: number, reps: number): string {
        if (reps === 1) {
            return weight.toString();
        }
        if(reps > 12) {
            return "Too many reps for Calculation";
        }
        return (weight * (1 + reps / 30)).toString();
    }
    if (entries.length === 0) {
        return <div className="text-muted">No entries found for this exercise.</div>;
    }
    async function handleEditSubmit(entry: Entry, event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const weightNumber = Number(editWeight);
        const repsNumber = Number(editReps);
        if (weightNumber <= 0 || repsNumber <= 0) {
            setError("Weight and reps must be greater than 0.");
            return;
        }
        if (weightNumber === entry.weight && repsNumber === entry.reps) {
            setError("No changes made to the entry.");
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
            setError("Failed to edit entry.");
            console.error(error);
        }
    }
    return (<>
        <h2 className="text-heading text-xl font-bold my-4 self-center">Entries</h2>
        <div>

            {entries.map((entry) => (
                <div key={entry.id} className="flex flex-col bg-surface rounded-md p-2 mb-4 border border-border">
                    <div className="flex flex-col items-center  md:grid md:grid-cols-4 md:gap-4 md:place-items-center md:mx-auto md:w-[50vw]">
                        <div><p className="text-muted">Weight: </p> <p className="font-heading text-sm mt-1 text-center">{entry.weight}</p></div>
                        <div><p className="text-muted">Reps: </p> <p className="font-heading text-sm mt-1 text-center ">{entry.reps}</p></div>
                        <div><p className="text-muted">Date: </p> <p className="font-heading text-sm mt-1 text-center">{new Date(entry.date).toLocaleDateString()}</p></div>
                        <div><p className="text-muted">1RM: </p> <p className="font-heading text-sm mt-1 text-center">{calculateOneRM(entry.weight, entry.reps)}</p></div>
                    </div>
                    <div className="flex flex-row items-center self-center mt-2">
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
                        }} className="bg-accent border border-border rounded-md p-2 pl-4 pr-4 hover:bg-accent-dim ">{EditFormid === entry.id ? "X" : "Edit"}</button>
                        <button onClick={async () => {
                            try {
                                await Entryservice.deleteEntry(entry.id);
                                onRefresh();
                            } catch (error) {
                                console.error("Error deleting entry:", error);
                            }
                        }} className="text-accent border border-accent rounded-md p-2 pl-4 pr-4 hover:bg-accent-dim ml-4">Delete</button>
                    </div>
                    {EditFormid === entry.id && <h1 className="text-xl font-heading self-center mt-4">Edit-Menu:</h1>}
                    {EditFormid === entry.id && <form onSubmit={(event) => handleEditSubmit(entry, event)} className="flex flex-col items-center mt-4 md:flex-row justify-center md:gap-4">
                        {error && <p className="text-red-500">{error}</p>}
                        <label htmlFor="editWeight" className="text-muted">Weight</label>
                        <input id="editWeight" type="number" value={editWeight} onChange={(e) => setEditWeight(e.target.value)} className="bg-red-950 border border-border max-w-[70%] rounded-md p-2 mb-4" />
                        <label htmlFor="editReps" className="text-muted">Reps</label>
                        <input id="editReps" type="number" value={editReps} onChange={(e) => setEditReps(e.target.value)} className="bg-red-950 border border-border max-w-[70%] rounded-md p-2 mb-4" />
                        <button type="submit" className="bg-accent border border-border rounded-md p-2 mb-4  hover:bg-accent-dim  min-w-[100px] ">Confirm</button>
                    </form>}
                </div>
            ))}
        </div>
    </>
    );
}