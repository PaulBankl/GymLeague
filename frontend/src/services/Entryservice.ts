import type { Entry } from "../types/Entry";

export async function getEntriesByExerciseIdForUser(id: string): Promise<Entry[]> {
    return await fetch(`http://localhost:8080/api/entry/all/${id}`, { method: "GET", headers: { "Content-Type": "application/json" } ,credentials: "include" })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch exercise");
            }
            return response.json();
        });
}

export async function addEntryForUser(exerciseId: number, weight: number, reps: number): Promise<boolean> {
    const success = await fetch(`http://localhost:8080/api/entry/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
         credentials: "include",
        body: JSON.stringify({  exerciseId, weight, reps }),
    });
    if (!success.ok) {
        throw new Error("Failed to add entry");
    }
    return true;
}

export async function deleteEntry(entryId: number): Promise<boolean> {
    const success = await fetch(`http://localhost:8080/api/entry/${entryId}`, {
        method: "DELETE",
         credentials: "include",
    });
    if (!success.ok) {
        throw new Error("Failed to delete entry");
    }
    return true;
}
export async function editEntry(id: number, weight: number, reps: number): Promise<boolean> {
    const success = await fetch('http://localhost:8080/api/entry/change', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
         credentials: "include",
        body: JSON.stringify({ id, weight, reps }),
    });
    if (!success.ok) {
        throw new Error("Failed to edit entry");
    }
    return true;
}

export async function getBestEntryForExercise(exerciseId: number): Promise<Entry | null> {
    const response = await fetch((`http://localhost:8080/api/entry/best/${exerciseId}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
         credentials: "include"
    });
    if (response.status === 204) {
        return null;
    } if (!response.ok) {
        throw new Error("Failed to fetch best entry");
    }
    return await response.json();
}

