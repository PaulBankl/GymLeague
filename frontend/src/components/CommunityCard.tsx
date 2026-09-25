import type { Community } from "../types/Community";
import { useNavigate } from "react-router-dom";

export default function CommunityCard({ community }: { community: Community }) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center bg-surface rounded-md border border-border p-4 mb-4 w-[90%] md:w-[80%] mt-5" onClick={() => navigate(`/community/${community.id}`)}>
            <h2 className="text-lg font-heading text-[clamp(20px,2vw,50px)] font-bold mb-2">{community.name}</h2>
            <p className="max-w-[80%] whitespace-normal break-words text-center text-muted">{community.description}</p>
            <div className="flex flex-col items-start justify-between mt-2 md:flex-row">
                <div className="flex flex-row mr-4">
                    <p className="text-muted mr-2">Owner: </p>
                    <p className="font-body">{community.owner}</p>
                </div>

                <div className="flex flex-row mr-4">
                    <p className="text-muted mr-2"> Created At: </p>
                    <p className="font-body"> {new Date(community.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex flex-row mr-4">
                    <p className="text-muted mr-2">Private: </p>
                    <p className="font-body">{community.isPrivate ? "Yes" : "No"}</p>
                </div>

                <div className="flex flex-row mr-4">
                    <p className="text-muted mr-2">Members: </p>
                    <p className="font-body">{community.memberCount}</p>
                </div>
            </div>
        </div>
    );
}