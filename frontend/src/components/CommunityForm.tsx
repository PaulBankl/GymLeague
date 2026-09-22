import { useEffect, useState } from "react";
import * as CommunityService from "../services/Communityservice";
import type { Exercise } from "../types/Exercise";
import * as Exerciseservice from "../services/Exerciseservice";
import CommunityExerciseCard from "../components/CommunityExerciseCard";

export default function CommunityForm({ onCommunityCreated }: { onCommunityCreated: () => void }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const username = sessionStorage.getItem("username");
    const [error, setError] = useState<string | null>(null);
    const [ShowForm, setShowForm] = useState(false);

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
        if (name.trim() === "" || description.trim() === "") {
            setError("Name and description cannot be empty.");
            return;
        }
        if (!username) {
            setError("User not logged in.");
            return;
        }
        try {
            const response = await CommunityService.createCommunity(name.trim(), description.trim(), isPrivate, checkedExercises);
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
        onCommunityCreated();
        setShowForm(false);
    };
    if(!username) {
        return <div>Please log in to create a community.</div>;
    }
    if(exercises.length === 0 && ShowForm) {
        return <div>Loading exercises... <br>
        </br><h1>Then you can create a community.</h1></div>;
    }

    return (
        <>
            <button onClick={() => {if(ShowForm){setCheckedExercises([]);}setShowForm(!ShowForm)}}>{ShowForm ? "X" : "Create Community"}</button>
            {ShowForm && (
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="isPrivate">Private:</label>
                        <input
                            type="checkbox"
                            id="isPrivate"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                    </div>
                    <button type="submit">Create Community</button>

                {exercises.length > 0 && (
                    <div>
                        <h2>Select Exercises for the Community</h2>
                        {exercises.map((exercise) => (
                            <CommunityExerciseCard
                                key={exercise.id}
                                exercise={exercise}
                                checked={checkedExercises.includes(exercise.id)}
                                onChange={(checked : boolean) => {
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
                </form>
            )}
        </>
    );
}