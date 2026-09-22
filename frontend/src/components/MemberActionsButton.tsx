import { useState } from "react";
import * as CommunityService from "../services/Communityservice";
import type { Community } from "../types/Community";

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
        const username = sessionStorage.getItem("username");
        if (!username) {
            console.error("No username found in session storage.");
            return;
        }
        if (communityId === undefined || memberUsername === undefined) {
            console.error("Community ID or member username is undefined.");
            return;
        }
        try {
            switch (action) {
                case "kick":
                    const success = await CommunityService.kickMember(communityId, username, memberUsername);
                    if (success) {
                        onSuccess?.();
                    } else {
                        console.error("Failed to kick member.");
                    }
                    break;
                case "promote":
                    const promoteSuccess = await CommunityService.promoteMember(communityId, username, memberUsername);
                    if (promoteSuccess) {
                        onSuccess?.();
                    } else {
                        console.error("Failed to promote member.");
                    }
                    break;
                case "demote":
                    const demoteSuccess = await CommunityService.demoteMember(communityId, username, memberUsername);
                    if (demoteSuccess) {
                        onSuccess?.();
                    } else {
                        console.error("Failed to demote member.");
                    }
                    break;
                
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
    }
    return (
        <>
        <button onClick={() => setShowConfirmation(!showConfirmation)}>{showConfirmation ? "Cancel" : buttonText}</button>
        {showConfirmation && (
            <div className="confirmation-dialog">
                <p>Are you sure you want to {buttonText.toLowerCase()} {memberUsername}?</p>
                <button onClick={handleClick}>Yes</button>
                <button onClick={() => setShowConfirmation(false)}>No</button>
            </div>
        )}
           </>
    );
}