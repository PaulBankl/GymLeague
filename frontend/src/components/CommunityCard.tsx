import type { Community } from "../types/Community";
import "../styles/CommunityCard.css";

export default function CommunityCard({ community }: { community: Community }) {
    return (
        <div className="community-card">
            <h2>{community.name}</h2>
            <p>{community.description}</p>
            <p>Owner: {community.owner}</p>
            <p>Created At: {new Date(community.createdAt).toLocaleDateString()}</p>
            <p>Private: {community.isPrivate ? "Yes" : "No"}</p>
            <p>Members: {community.memberCount}</p>
        </div>
    );
}