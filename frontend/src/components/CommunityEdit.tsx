import { useEffect, useState } from "react";
import type { Community } from "../types/Community";
import * as CommunityService from "../services/Communityservice";
import type { Exercise } from "../types/Exercise";
import * as Exerciseservice from "../services/Exerciseservice"; 
import CommunityExerciseCard from "../components/CommunityExerciseCard";

type EditCommunityProps = {
    community: Community | null;
    onCommunityChange: () => void;
};

export default function CommunityEdit({ community, onCommunityChange }: EditCommunityProps) {
    const [description, setDescription] = useState(community?.description || "");
    const [isPrivate, setIsPrivate] = useState(community?.isPrivate || false);
    const [error, setError] = useState<string | null>(null);
    const username = sessionStorage.getItem("username");

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [checkedExercises, setCheckedExercises] = useState<number[]>([]);


    useEffect(() => {
            Exerciseservice.getExercises().then((data) => {
                setExercises(data);
            }).catch((error) => {
                console.error("Failed to fetch exercises:", error);
            });
            setCheckedExercises(community?.exercises.map(exercise => exercise.id) || []);
        }, []);


    async function HandleChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (description == community?.description && isPrivate == community?.isPrivate && checkedExercises.length === community?.exercises.length && checkedExercises.every(id => community?.exercises.some(exercise => exercise.id === id))) {
            setError("No changes made.");
            return;
        } {
            e.preventDefault();
            if (!community) {
                console.error("No community data available.");
                setError("No community data available.");
                return;
            }
            if(description.length > 255) {
                setError("Description cannot exceed 255 characters.");
                return;
            }
            if (!username) {
                console.error("No username found");
                setError("No username found.");
                return;
            }
            const response = await CommunityService.editCommunity(community.name, description, isPrivate, checkedExercises);
            if (!response) {
                console.error("Failed to edit community.");
                setError("Failed to edit community.");
                return;
            }
            onCommunityChange();
            setError(null);
        }
    }
        return (
            <div>
                <h1>Edit Community</h1>
                <p>Here you can edit your community details.</p>
                {error && <p style={{ color: "red" }}>Failed to edit community. <br></br>Please try again.</p>}
                <div className="edit-community-form">
                    <form>
                        <br />
                        <label htmlFor="description">
                            Description:
                            <textarea defaultValue={community?.description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </label>
                        <br />
                        <label htmlFor="isPrivate">
                            Private:
                            <input type="checkbox" defaultChecked={community?.isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
                        </label>
                        <br />
                            {exercises.map((exercise) => (
                                <CommunityExerciseCard
                                    key={exercise.id}
                                    exercise={exercise} checked={checkedExercises.includes(exercise.id)} onChange={(checked : boolean) => {
                                    if (checked) {
                                        setCheckedExercises([...checkedExercises, exercise.id]);
                                    } else {
                                        setCheckedExercises(checkedExercises.filter((id) => id !== exercise.id));
                                    }
                                }}                            />
                            ))}
                        <br />
                        <button onClick={HandleChange}>Save Changes</button>
                    </form>
                </div>
            </div>
        );
    }
