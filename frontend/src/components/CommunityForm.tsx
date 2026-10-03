import { useEffect, useState } from "react";
import * as CommunityService from "../services/Communityservice";
import type { Exercise } from "../types/Exercise";
import * as Exerciseservice from "../services/Exerciseservice";
import CommunityExerciseCard from "../components/CommunityExerciseCard";

export default function CommunityForm({ onCommunityCreated }: { onCommunityCreated: () => void }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [ShowForm, setShowForm] = useState(false);
    const [joinCode, setJoinCode] = useState("");


    const [exercises, setExercises] = useState<Exercise[]>([]);

    const [checkedExercises, setCheckedExercises] = useState<number[]>([]);



    useEffect(() => {
        Exerciseservice.getExercises().then((data) => {
            setExercises(data);
        }).catch((error) => {
            console.error("Failed to fetch exercises:", error);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() === "") {
            setError("Name cannot be empty.");
            return;
        }
        if (name.length < 3) {
            setError("Name must be at least 3 characters long.");
            return;
        }
        if (name.length > 50) {
            setError("Name cannot exceed 50 characters.");
            return;
        }
        if (description.length > 255) {
            setError("Description cannot exceed 255 characters.");
            return;
        }
        if (joinCode.length < 4) {
            setError("Join code must be at least 4 characters long.");
            return;
        }
        if (joinCode.length > 10) {
            setError("Join code cannot exceed 10 characters.");
            return;
        }
        try {
            const response = await CommunityService.createCommunity(name.trim(), description.trim(), isPrivate, checkedExercises, joinCode.trim());
            if (!response) {
                setError("Failed to create community. try a different name.");
                return;
            }
        }
        catch (error) {
            setError("Error creating community. try a different name.");
            console.error(error);
            return;
        }
        setError(null);
        setName("");
        setDescription("");
        setIsPrivate(false);
        setCheckedExercises([]);
        setJoinCode("");
        onCommunityCreated();
        setShowForm(false);
    };
    if (exercises.length === 0 && ShowForm) {
        return <div>Loading exercises... <br>
        </br><h1>Then you can create a community.</h1></div>;
    }

    return (
        <>
            {!ShowForm && <button onClick={() => { if (ShowForm) { setCheckedExercises([]); } setShowForm(!ShowForm) }} className="bg-accent border border-border rounded-md p-2 mb-4  hover:bg-accent-dim pl-5 pr-5">{ShowForm ? "X" : "Create Community"}</button>}
            {ShowForm && (<div>

                <form onSubmit={handleSubmit} className="bg-surface flex flex-col items-center md:w-[40vw] mx-auto">
                    <h1 className="text-body self-start ml-5 text-lg mt-5">Create a New Community</h1>
                    {error && <p className="text-accent">{error}</p>}

                    <label htmlFor="name" className="text-muted self-start ml-[5%] mt-5">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-surface-2 self-start ml-[5%] border border-border rounded-md p-2 mb-4 w-[90%] md:w-[90%]"
                    />
                    <label htmlFor="description" className="text-muted self-start ml-[5%] mt-5">Description: max 255 characters</label>
                    <input type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-surface-2 self-start ml-[5%] border border-border rounded-md p-2 mb-4 w-[90%] md:w-[90%]"
                    />
                    <p className="muted text-sm self-end mr-[5%]">Characters remaining: {255 - description.length}</p>
                    <label htmlFor="JoinCode" className="text-muted self-start ml-[5%] mt-5">Join Code: 4-10 characters</label>
                    <input
                        id="JoinCode"
                        type="text"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                        className="bg-surface-2 self-start ml-[5%] border border-border rounded-md p-2 mb-4 w-[90%] md:w-[90%]"
                    />
                    <div className="self-start ml-[5%] mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="isPrivate"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                        <label htmlFor="isPrivate" className="text-muted ml-2">Private</label>
                    </div>


                    {exercises.length > 0 && (
                        <div className="flex flex-col items-start w-[90%]">
                            <h2 className="text-body self-start mb-2">Select Exercises for the Community</h2>
                            {exercises.map((exercise) => (
                                <CommunityExerciseCard
                                    key={exercise.id}
                                    exercise={exercise}
                                    checked={checkedExercises.includes(exercise.id)}
                                    onChange={(checked: boolean) => {
                                        if (checked) {
                                            setCheckedExercises([...checkedExercises, exercise.id]);
                                        } else {
                                            setCheckedExercises(checkedExercises.filter((id) => id !== exercise.id));
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    )}
                    <div className="self-start ml-[5%] mb-4 flex items-center mt-5 mb-4">
                        <button type="submit" className="bg-accent border border-border rounded-md p-2 hover:bg-accent-dim pl-5 pr-5">Create Community</button>
                    </div>
                </form>
                <button onClick={() => { if (ShowForm) { setCheckedExercises([]); } setShowForm(!ShowForm) }} className="text-accent border border-accent rounded-md ml-2 p-2 hover:bg-accent-dim">Cancel</button>
            </div>
            )}
        </>
    );
}