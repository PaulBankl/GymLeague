import type { Entry } from "../types/Entry";
import type { Exercise } from "../types/Exercise";
import { apiFetch } from "./api";

export async function getExercises(): Promise<Exercise[]> {
    const response = await apiFetch("/api/exercises/all", { method: "GET", headers: { "Content-Type": "application/json" } });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return response.json();
}

export async function getExerciseById(id: string): Promise<Exercise> {
    const response = await apiFetch(`/api/exercises/${id}`, { method: "GET", headers: { "Content-Type": "application/json" } })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return response.json();
}

export async function getExerciseInfoById(id: string): Promise<{ entryCount: number; bestEntry: Entry | null; progressPercent: number; progressOneRm: number }> {
    const response = await apiFetch(`/api/exercises/info/${id}`, { method: "GET", headers: { "Content-Type": "application/json" } })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return response.json();
}

