import { useEffect, useState } from "react";
import type { Entry } from "../types/Entry";
import * as Entryservice from "../services/Entryservice";

type EntryListProps = {
    exerciseId: string;
    refresh: number;
};




export default function EntryList({ exerciseId, refresh }: EntryListProps){
    const username = sessionStorage.getItem("username");
    const [entries, setEntries] = useState<Entry[] | null>(null);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        if (exerciseId && username) {
            Entryservice.getEntriesByExerciseIdForUser(exerciseId, username)
                .then(setEntries)
                .catch((error: Error) => {
                    console.error("Error fetching entries:", error);
                    setError(true);
                });
        }
    },[exerciseId, refresh]);

    if(!exerciseId) {
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
    return (
        <div>
            <h2>Entries</h2>
            {entries.map((entry) => (
                <div key={entry.id}>
                    <p>Weight: {entry.weight}</p>
                    <p>Reps: {entry.reps}</p>
                    <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}