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
    const [joinCode, setJoinCode] = useState(community?.joinCode || "");

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [checkedExercises, setCheckedExercises] = useState<number[]>(community?.exercises.map(exercise => exercise.id) || []);


    useEffect(() => {
        Exerciseservice.getExercises().then((data) => {
            setExercises(data);
        }).catch((error) => {
            console.error("Failed to fetch exercises:", error);
        });
    }, []);


    async function HandleChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (description == community?.description && isPrivate == community?.isPrivate && checkedExercises.length === community?.exercises.length && checkedExercises.every(id => community?.exercises.some(exercise => exercise.id === id)) && joinCode == community?.joinCode) {
            setError("No changes made.");
            return;
        } {
            if (!community) {
                console.error("No community data available.");
                setError("No community data available.");
                return;
            }
            if (description.length > 255) {
                setError("Description cannot exceed 255 characters.");
                return;
            }
            try {
                const response = await CommunityService.editCommunity(community.name, description, isPrivate, checkedExercises, joinCode);
                if (!response) {
                    console.error("Failed to edit community.");
                    setError("Failed to edit community.");
                    return;
                }
                onCommunityChange();
                setError(null); 
            } catch (error) {
                console.error("Error editing community:", error);
                setError("Error editing community.");
                return;
            }
        }
    }
    return (
        <div className="flex w-[80vw] flex-col items-center gap-4  md:w-[50vw]">
            <h1 className="text-2xl font-heading">Edit Community</h1>
            <p className="text-muted">Here you can edit your community details.</p>
            {error && <p className="text-red-500 border border-red-500 p-2 rounded-md" >Failed to edit community. <br></br>Please try again.</p>}
            <div className="flex flex-col w-full ">
                <form className="flex flex-col items-center w-full">
                    <br />
                    <label htmlFor="description" className="text-muted block">
                        Description:
                    </label>
                    <textarea defaultValue={community?.description} onChange={(e) => setDescription(e.target.value)} className="ml-[5%] bg-surface-2 self-start block w-[90%] border border-border rounded-md p-2 mb-4 "></textarea>
                    <p className="muted text-sm self-end mr-[5%]">Characters remaining: {255 - description.length}</p>

                    <br />
                    <label htmlFor="description" className="text-muted block">
                        JoinCode:
                    </label>
                    <textarea defaultValue={community?.joinCode} onChange={(e) => setJoinCode(e.target.value)} className="ml-[5%] bg-surface-2 self-start block w-[90%] border border-border rounded-md p-2 mb-4 "></textarea>

                    <br />

                    <label htmlFor="isPrivate" className="text-muted block">
                        Private:
                        <input type="checkbox" defaultChecked={community?.isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
                    </label>
                    <br />
                    {exercises.map((exercise) => (
                        <CommunityExerciseCard
                            key={exercise.id}
                            exercise={exercise} checked={checkedExercises.includes(exercise.id)} onChange={(checked: boolean) => {
                                if (checked) {
                                    setCheckedExercises([...checkedExercises, exercise.id]);
                                } else {
                                    setCheckedExercises(checkedExercises.filter((id) => id !== exercise.id));
                                }
                            }} />
                    ))}
                    <br />
                    <button onClick={HandleChange} className="bg-accent border border-border rounded-md p-2 hover:bg-accent-dim pl-5 pr-5">Save Changes</button>
                </form>
            </div>
        </div>
    );
}
