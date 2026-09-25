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
            CommunityService.getAllCommunitiesForUser()
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
        <div className="flex flex-col items-center w-[80vw] md:w-[50vw] mx-auto h-screen mt-[2vw]">
             <Link to="/app" className="text-accent underline underline-offset-4 self-start">Back to Dashboard</Link>
            <h1 className="font-heading text-[clamp(22px,10vw,72px)] text-center font-black tracking-[-2px]">Community Overview</h1>
            <p className="text-muted text-center">Welcome to the community overview page!</p>
            <Link to="/community/all" className="text-accent underline underline-offset-4 mt-5 ">View All Communities</Link>
            <br></br>
             <CommunityForm onCommunityCreated={() => setRefresh((prev) => prev + 1)} />
             {communities.length === 0 ? <p className="text-muted text-center mt-5">No communities found.</p> : (communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
            )))}
        </div>
    );
}