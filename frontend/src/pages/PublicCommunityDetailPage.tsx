import type { Community } from "../types/Community";
import CommunityDetailCard from "../components/CommunityDetailCard";
import { useContext, useEffect, useState } from "react";
import * as CommunityService from "../services/Communityservice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MemberList from "../components/MemberList";




export default function PublicCommunityDetailPage() {

    const [community, setCommunity] = useState<Community | null>(null);
    const [members, setMembers] = useState<{ username: string; displayName: string; role: string; joinedAt: string }[]>([]);
    const [error, setError] = useState(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();



    const username = useContext(AuthContext)?.username;

    const handleJoinCommunity = async () => {
        if (!username) {
            console.error("Login");
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

    useEffect(() => {
        if (!id) {
            return;
        }
        setCommunity(null);
        CommunityService.getCommunityDetails(Number(id)).then((data) => {
            setCommunity(data);
        }).catch((error) => {
            setError(true);
            console.error("Error fetching community details:", error);
        });
        CommunityService.getAllMembersOfCommunity(Number(id)).then((data) => {
            setMembers(data);
        }).catch((error) => {
            console.error("Failed to fetch community members:", error);
        });
    }, [id]);

    if (!id) {
        return <div>Invalid community ID</div>;
    }
    if (error) {
        return <div>Server Error</div>;
    }

    if (!community || community.id !== Number(id)) {
        return <div>Loading community details...</div>;
    }
    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center mx-auto mt-[2vw] w-[80vw] md:w-[50vw] border border-border rounded-md p-4 bg-surface">
                <h1 className="font-heading mt-2 text-[clamp(22px,15vw,72px)] font-black ">{community.name}</h1>
                <p className="text-muted mb-4 ">{community.description}</p>
                {<CommunityDetailCard community={community} />}
                <h1>Exercises</h1>
                {community.exercises.length === 0 ? <p className="text-muted mt-2">No exercises available.</p> : null}
                {community.exercises.map((exercise) => (<h1 key={exercise.id} className="text-muted">{exercise.name}</h1>))}
            </div>
            <MemberList community={community} members={members}></MemberList>
            <div className="flex flex-col items-center mt-10">
                <button onClick={handleJoinCommunity} className="border border-accent text-white  rounded-md p-2 bg-accent">Join Community</button>
                <Link to="/community/all" className="border border-border p-2 rounded-md mt-2  text-muted">Back to Community</Link>
            </div>
        </div>

    );

}
