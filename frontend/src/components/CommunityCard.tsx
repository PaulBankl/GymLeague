import type { Community } from "../types/Community";
import "../styles/CommunityCard.css";
import { useNavigate } from "react-router-dom";

export default function CommunityCard({ community }: { community: Community }) {
    const navigate = useNavigate();
    return (
        <div className="community-card" onClick={() => navigate(`/community/${community.id}`)}>
            <h2>{community.name}</h2>
            <p>{community.description}</p>
            <p>Owner: {community.owner}</p>
            <p>Created At: {new Date(community.createdAt).toLocaleDateString()}</p>
            <p>Private: {community.isPrivate ? "Yes" : "No"}</p>
            <p>Members: {community.memberCount}</p>
        </div>
    );
}