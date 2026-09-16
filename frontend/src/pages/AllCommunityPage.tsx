import { Link } from "react-router-dom";
import type { Community } from "../types/Community";
import { useEffect, useState } from "react";
import * as CommunityService from "../services/Communityservice";

export default function AllCommunityPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        CommunityService.get10RandomCommunities().then(setCommunities).catch((error) => {
            console.error("Error fetching communities:", error);
            setError(true);
        });
    }, []);

    if (error) {
        return(<><p>Server Error</p><br></br><Link to="/community">Back to Community</Link></>);
    }

    if (communities.length === 0) {
        return (<><div>No communities found.</div><Link to="/community">Back to Community</Link></>);
    }
    return (
        <div>
            <Link to="/community">Back to Community</Link>
            <h1>All Communities</h1>
            <p>Here you can find 10 random communities, if you look for something specific a search function will be implemented in the future!</p>
            {communities.map(community => (
                <div key={community.id} className="member-item">
                    <h2>{community.name}</h2>
                    <p>{community.description}</p>
                    <p>Owner: {community.owner}</p>
                    <p>Members: {community.memberCount}</p>
                    <p>Created: {new Date(community.createdAt).toLocaleDateString()}</p>
                    <p>Private: {community.isPrivate ? "Yes" : "No"}</p>
                    <Link to={`/community/public/${community.id}`}>View Community</Link>
                </div>
            ))}
        </div>
    );
}