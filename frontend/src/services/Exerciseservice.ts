import type { Entry } from "../types/Entry";
import type { Exercise } from "../types/Exercise";

export async function getExercises(): Promise<Exercise[]> {
    const response = await fetch("http://localhost:8080/api/exercises/all", { method: "GET", headers: { "Content-Type": "application/json" } });
    if (!response.ok) {
        throw new Error("Failed to fetch exercises");
    }
    return await response.json();
}

export async function getExerciseById(id: string): Promise<Exercise> {
    return await fetch(`http://localhost:8080/api/exercises/${id}`, { method: "GET", headers: { "Content-Type": "application/json" } })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch exercise");
            }
            return response.json();
        });
}
