import { useEffect, useState } from "react";
import * as CommunityService from "../services/Communityservice";
import type { Community } from "../types/Community";
import CommunityForm from "../components/CommunityForm";
import CommunityCard from "../components/CommunityCard";

export default function CommunityOverviewPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        const username = sessionStorage.getItem("username");
        if (username) {
            CommunityService.getAllCommunitiesForUser(username)
                .then(setCommunities)
                .catch((error) => {
                    setError(true);
                });
        }
    }, []);

    if (error) {
        return <div>Server Error</div>;
    }
    return (
        <div>
            <h1>Community Overview</h1>
            <p>Welcome to the community overview page!</p>
             <CommunityForm />
             {communities.length === 0 ? <p>No communities found.</p> : (communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
            )))}
        </div>
    );
}