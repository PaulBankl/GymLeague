import type { Community } from "../types/Community";
import CommunityDetailCard from "../components/CommunityDetailCard";
import { useEffect, useState } from "react";
import * as CommunityService from "../services/Communityservice";
import { Link, useNavigate, useParams } from "react-router-dom";




export default function PublicCommunityDetailPage() {

    const [community, setCommunity] = useState<Community | null>(null);
    const [members, setMembers] = useState<{ username: string; role: string; joinedAt: string }[]>([]);
    const [error, setError] = useState(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    if(!id) {
        return <div>Invalid community ID</div>;
    }

    const username = sessionStorage.getItem("username");

    const handleJoinCommunity = async () => {
        if (!username) {
            console.error("No username found in session storage.");
            return;
        }
        try {
            const success = await CommunityService.joinCommunity(Number(id));
            if (success) {
                navigate(`/community/${id}`);
            } else {
                setError(true);
            }
        } catch (error) {
            console.error("Error joining community:", error);
            setError(true);
        }
    };

    useEffect(() => {setCommunity(id ? null : community);
        CommunityService.getCommunityDetails(Number(id)).then((data) => {
            setCommunity(data);
        }).catch((error) => {
            setError(true);
        });
        CommunityService.getAllMembersOfCommunity(Number(id)).then((data) => {
            setMembers(data);
        }).catch((error) => {
            console.error("Failed to fetch community members:", error);
        });
    }, []);

    if(error) {
        return <div>Server Error</div>;
    }

    if (!community) {
        return <div>Loading community details...</div>;
    }
    return (
        <div>
            { <h1>{community.name}</h1> }
            {<CommunityDetailCard community={community} members={members} /> }
            <h1>Exercises</h1>
            {community.exercises.length === 0 ? <p>No exercises available.</p> : null}
            {community.exercises.map((exercise) => (<h1 key={exercise.id}>{exercise.name}</h1>))}
            <button onClick={handleJoinCommunity}>Join Community</button>
            <br></br>
            <Link to="/community/all">Back to Community</Link>
                </div>
            );
            
}
