import type { User } from "./User";
import type { Exercise } from "./Exercise";

export type Entry = {
    id: number;
    weight: number;
    reps: number;
    date: string;
    user: User;
    exercise: Exercise;
};