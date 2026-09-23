import type { Entry } from "../types/Entry";
import type { Exercise } from "../types/Exercise";
import { apiFetch } from "./api";

export async function getExercises(): Promise<Exercise[]> {
    const response = await apiFetch("/api/exercises/all", { method: "GET", headers: { "Content-Type": "application/json" }});
    if (!response.ok) {
        throw new Error("Failed to fetch exercises");
    }
    return await response.json();
}

export async function getExerciseById(id: string): Promise<Exercise> {
    return await apiFetch(`/api/exercises/${id}`, { method: "GET", headers: { "Content-Type": "application/json" } })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch exercise");
            }
            return response.json();
        });
}

export async function getExerciseInfoById(id: string): Promise<{ entryCount: number; bestEntry: Entry | null; progressPercent: number; progressOneRm: number }> {
    return await apiFetch(`/api/exercises/info/${id}`, { method: "GET", headers: { "Content-Type": "application/json" } })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch exercise info");
            }
            return response.json();
        });
}

