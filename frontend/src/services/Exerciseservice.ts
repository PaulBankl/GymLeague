import type { Entry } from "../types/Entry";
import type { Exercise } from "../types/Exercise";

export async function getExercises(): Promise<Exercise[]> {
    const response = await fetch("http://localhost:8080/api/exercises/all", { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include" });
    if (!response.ok) {
        throw new Error("Failed to fetch exercises");
    }
    return await response.json();
}

export async function getExerciseById(id: string): Promise<Exercise> {
    return await fetch(`http://localhost:8080/api/exercises/${id}`, { method: "GET", headers: { "Content-Type": "application/json" } ,  credentials: "include"})
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch exercise");
            }
            return response.json();
        });
}

export async function getExerciseInfoById(id: string, username: string): Promise<{ entryCount: number; bestEntry: Entry | null; progressPercent: number; progressOneRm: number }> {
    return await fetch(`http://localhost:8080/api/exercises/info/${id}?username=${username}`, { method: "GET", headers: { "Content-Type": "application/json" } , credentials: "include"})
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch exercise info");
            }
            return response.json();
        });
}

