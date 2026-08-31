import { useState } from "react";
import * as CommunityService from "../services/Communityservice";
import type { Community } from "../types/Community";
import CommunityForm from "../components/CommunityForm";

export default function CommunityOverviewPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    return (
        <div>
            <h1>Community Overview</h1>
            <p>Welcome to the community overview page!</p>
             <CommunityForm />
        </div>
    );
}