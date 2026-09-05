import { useState } from "react";
import type { Community } from "../types/Community";
import * as CommunityService from "../services/Communityservice";

type EditCommunityProps = {
    community: Community | null;
    onCommunityChange: () => void;
};

export default function CommunityEdit({ community, onCommunityChange }: EditCommunityProps) {
    const [description, setDescription] = useState(community?.description || "");
    const [isPrivate, setIsPrivate] = useState(community?.isPrivate || false);
    const [error, setError] = useState<boolean>(false);


    async function HandleChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (!community) {
            console.error("No community data available.");
            setError(true);
            return;
        }
        const response = await CommunityService.editCommunity(community.id, description, isPrivate);
        if(!response) {
            console.error("Failed to edit community.");
            setError(true);
            return;
        }

        onCommunityChange();
    }
    return (
        <div>
            <h1>Edit Community</h1>
            <p>Here you can edit your community details.</p>
            {error && <p style={{ color: "red" }}>Failed to edit community. <br></br>Please try again.</p>}
            <div edit-community-form>
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
                    <button onClick={HandleChange}>Save Changes</button>
                </form>
            </div>
        </div>
    );
}