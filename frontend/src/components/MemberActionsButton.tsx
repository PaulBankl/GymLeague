import { useState } from "react";
import * as CommunityService from "../services/Communityservice";


type MemberActionsButtonProps = {
    communityId: number;
    memberUsername: string;
    action: "kick" | "promote" | "demote";
    onSuccess?: () => void;
};
export default function MemberActionsButton({ communityId, memberUsername, action, onSuccess }: MemberActionsButtonProps) {

    const [showConfirmation, setShowConfirmation] = useState(false);

    const buttonText = {
        kick: "Kick",
        promote: "Promote",
        demote: "Demote"
    }[action];
    async function handleClick() {

        if (communityId === undefined || memberUsername === undefined) {
            console.error("Community ID or member username is undefined.");
            return;
        }
        try {
            switch (action) {
                case "kick": {
                    const success = await CommunityService.kickMember(communityId, memberUsername);
                    if (success) {
                        onSuccess?.();
                    } else {
                        console.error("Failed to kick member.");
                    }
                    break;
                }
                case "promote":
                    {
                        const promoteSuccess = await CommunityService.promoteMember(communityId, memberUsername);
                        if (promoteSuccess) {
                            onSuccess?.();
                        } else {
                            console.error("Failed to promote member.");
                        }
                        break;
                    }

                case "demote":
                    {
                        const demoteSuccess = await CommunityService.demoteMember(communityId, memberUsername);
                        if (demoteSuccess) {
                            onSuccess?.();
                        } else {
                            console.error("Failed to demote member.");
                        }
                        break;
                    }
            }

        } catch (error) {
            if (action === "kick") {
                alert(`Failed to kick ${memberUsername} from the community.`);
            } else if (action === "promote") {
                alert(`Failed to promote ${memberUsername} in the community.`);
            } else if (action === "demote") {
                alert(`Failed to demote ${memberUsername} in the community.`);
            }
            console.error(error);
        }
        setShowConfirmation(false);
    }
    return (
        <>
            {!showConfirmation && buttonText === "Demote" && <button onClick={() => setShowConfirmation(!showConfirmation)} className="border border-border p-1 rounded-md mt-2  text-muted">{buttonText}</button>}
            {!showConfirmation && buttonText === "Promote" && <button onClick={() => setShowConfirmation(!showConfirmation)} className="border border-accent bg-accent p-1 rounded-md mt-2  text-white">{buttonText}</button>}
            {!showConfirmation && buttonText === "Kick" && <button onClick={() => setShowConfirmation(!showConfirmation)} className="border border-red-accent p-1 rounded-md mt-2 bg-surface   text-accent">{buttonText}</button>}
            {showConfirmation && (
                <div className="border-border-accent border p-2 rounded-md mt-2 bg-surface flex flex-col items-center gap-2">
                    <p>Are you sure you want to {buttonText.toLowerCase()} {memberUsername}?</p>
                    <button onClick={handleClick} className="border border-accent text-accent p-1 rounded-md mt-2 bg-surface">Yes</button>
                    <button onClick={() => setShowConfirmation(false)} className="border-green-500 border text-green-500 p-1 rounded-md mt-2 bg-surface">No</button>
                </div>
            )}
        </>
    );
}