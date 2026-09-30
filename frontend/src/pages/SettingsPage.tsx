
import { useState } from "react";
import * as UserService from "../services/Userservice";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
    const navigate = useNavigate();
    
    async function updateDisplayName( e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(newDisplayName.length < 3 || newDisplayName.length > 20) {
            setResult("Display name must be between 3 and 20 characters.");
            return;
        }
        if(newDisplayName.trim() === "") {
            setResult("Display name cannot be empty.");
            return;
        }
            try {
                const result = await UserService.changeDisplayName(newDisplayName);
                if (!result) {
                    setResult("Failed to update display name. Please try again.");
                }
                else{
                    setResult("Display name updated successfully.");
                }
            } catch (error) {
                console.error("Failed to update display name:", error);
                setResult("Failed to update display name. Please try again.");
            }
            finally {
                setShowDisplayNameInput(false);
            }
        }
        const [showDisplayNameInput, setShowDisplayNameInput] = useState(false);
        const [newDisplayName, setNewDisplayName] = useState("");
        const [result, setResult] = useState<string | null>(null);

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-heading text-[clamp(48px,10vw,72px)] text-center font-black tracking-[-2px]">Settings</h1>
            <h2 className="font-heading text-[clamp(24px,5vw,36px)] text-muted mt-4"> Change your display name</h2>
            {!showDisplayNameInput && (
                <button onClick={() => setShowDisplayNameInput(true)} className="font-heading text-white bg-accent border border-border rounded-md p-2">Change</button>
            )}
            {showDisplayNameInput && (
                <button onClick={() => setShowDisplayNameInput(false)} className="font-heading text-white bg-accent border border-border rounded-md p-2">Cancel</button>
            )}
            {showDisplayNameInput && (
                <form className="flex flex-col items-center" onSubmit={(e) => updateDisplayName(e)}>
                    <label htmlFor="displayName" className="text-muted mt-2">New Display Name:</label>
                    <input type="text" id="displayName" name="displayName" value={newDisplayName} className="border border-border bg-surface-2 rounded-md p-2" onChange={(e) => setNewDisplayName(e.target.value)} />
                    <button type="submit" className="font-heading text-white bg-accent rounded-md p-2 mt-2" >Submit</button>
                </form>
            )}
            {result && (
                <p className="text-muted-500 mt-2">{result}</p>
            )}
             <button onClick={() => navigate("/app")} className="border border-border p-2 rounded-md mt-2  text-muted">Back to Dashboard</button>
        </div>
    );
}