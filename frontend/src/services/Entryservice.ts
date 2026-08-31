import type { Entry } from "../types/Entry";

export async function getEntriesByExerciseIdForUser(id: string, username: string): Promise<Entry[]> {
    return await fetch(`http://localhost:8080/api/entry/all/${id}?username=${username}`, { method: "GET", headers: { "Content-Type": "application/json" } })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch exercise");
            }
            return response.json();
        });
}

export async function addEntryForUser(username: string, exerciseId: number, weight: number, reps: number): Promise<boolean> {
    const success = await fetch(`http://localhost:8080/api/entry/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, exerciseId, weight, reps }),
    });
    if (!success.ok) {
        throw new Error("Failed to add entry");
    }
    return true;
}

export async function deleteEntry(entryId: number): Promise<boolean> {
    const success = await fetch(`http://localhost:8080/api/entry/${entryId}`, {
        method: "DELETE",
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
        body: JSON.stringify({ id, weight, reps }),
    });
    if (!success.ok) {
        throw new Error("Failed to edit entry");
    }
    return true;
}
