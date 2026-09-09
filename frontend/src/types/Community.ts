
import type { Exercise } from "./Exercise";

export type Community = {
    id: number;
    name: string;
    description: string;
    isPrivate: boolean;
    createdAt: string;
    owner: string;
    memberCount: number;
    exercises: Exercise[];
};

