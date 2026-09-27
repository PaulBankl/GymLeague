import type { Entry } from "../types/Entry";
import { apiFetch } from "./api";

export async function getEntriesByExerciseIdForUser(id: string): Promise<Entry[]> {
    const response = await apiFetch(`/api/entry/all/${id}`, { method: "GET", headers: { "Content-Type": "application/json" } })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }

    return response.json();
}

export async function addEntryForUser(exerciseId: number, weight: number, reps: number): Promise<boolean> {
    const response = await apiFetch(`/api/entry/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ exerciseId, weight, reps }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return true;
}

export async function deleteEntry(entryId: number): Promise<boolean> {
    const response = await apiFetch(`/api/entry/${entryId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return true;
}
export async function editEntry(id: number, weight: number, reps: number): Promise<boolean> {
    const response = await apiFetch('/api/entry/change', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, weight, reps }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return true;
}

export async function getBestEntryForExercise(exerciseId: number): Promise<Entry | null> {
    const response = await apiFetch(`/api/entry/best/${exerciseId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status === 204) {
        return null;
    } if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return await response.json();
}

