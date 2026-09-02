import { useEffect, useState } from "react";
import * as CommunityService from "../services/Communityservice";
import type { Community } from "../types/Community";
import CommunityForm from "../components/CommunityForm";
import CommunityCard from "../components/CommunityCard";
import { Link } from "react-router-dom";

export default function CommunityOverviewPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [error, setError] = useState(false);
    const [refresh, setRefresh] = useState(0);
    useEffect(() => {
        const username = sessionStorage.getItem("username");
        if (username) {
            CommunityService.getAllCommunitiesForUser(username)
                .then(setCommunities)
                .catch((error) => {
                    setError(true);
                });
        }
    }, [refresh]);

    if (error) {
        return <div>Server Error</div>;
    }
    return (
        <div>
             <Link to="/app">Back to Dashboard</Link>
            <h1>Community Overview</h1>
            <p>Welcome to the community overview page!</p>
             <CommunityForm onCommunityCreated={() => setRefresh((prev) => prev + 1)} />
             {communities.length === 0 ? <p>No communities found.</p> : (communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
            )))}
        </div>
    );
}