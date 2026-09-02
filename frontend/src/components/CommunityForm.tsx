import { useState } from "react";
import * as CommunityService from "../services/Communityservice";

export default function CommunityForm({ onCommunityCreated }: { onCommunityCreated: () => void }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const username = sessionStorage.getItem("username");
    const [error, setError] = useState<string | null>(null);
    const [ShowForm, setShowForm] = useState(false);

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
        try{
            const response = await CommunityService.createCommunity(name.trim(), description.trim(), isPrivate, username);
            if(!response) {
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
    };

    return (
        <>
            <button onClick={() => setShowForm(!ShowForm)}>{ShowForm ? "X" : "Create Community"}</button>
            {ShowForm && (
                <form onSubmit={handleSubmit}>
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
                </form>
            )}
            {error && <p className="error">{error}</p>}
        </>
    );
}