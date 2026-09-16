import { useParams } from "react-router-dom";
import * as Communityservice from "../services/Communityservice";
import { useEffect, useState } from "react";
import type { Community } from "../types/Community";
import { useNavigate } from "react-router-dom";
import CommunityEdit from "../components/CommunityEdit";
import CommunityDetailCard from "../components/CommunityDetailCard";

export default function CommunityDetailPage() {
    const username = sessionStorage.getItem("username");
    const[editMode, setEditMode] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [refresh, setRefresh] = useState(0);
    const [community, setCommunity] = useState<Community | null>(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [members, setMembers] = useState<{ username: string; role: string; joinedAt: string }[]>([]);

    if(!id) {
        return <div>Invalid community ID</div>;
    }
    useEffect(() => {
        setCommunity(id ? null : community);
        Communityservice.getCommunityDetails(Number(id)).then((data) => {
            setCommunity(data);
        }).catch((error) => {
            setError(true);
        });
        Communityservice.getAllMembersOfCommunity(Number(id)).then((data) => {
            setMembers(data);
        }).catch((error) => {
            console.error("Failed to fetch community members:", error);
        });
    }, [id, refresh]);

    function buttonLeave() {
        const username = sessionStorage.getItem("username");
        if (!username) {
            console.error("No username found in session storage.");
            return;
        }
        Communityservice.leaveCommunity(Number(id), username).then((success) => {
            if (success) {
                navigate("/community");
            } else {
                alert("Failed to leave the community.");
            }
        }).catch((error) => {
            alert("An error occurred while trying to leave the community.");
            console.error(error);
        });
    }
    if(error) {
        return <div>Server Error</div>;
    }

    if (!community) {
        return <div>Loading community details...</div>;
    }
    return (
        <div>
            <h1>{community.name}</h1>
            {username === community.owner && (
                <button onClick={() => setEditMode(!editMode)}>{editMode ? "Cancel" : "Edit Community"}</button>
            )}
            {editMode && <CommunityEdit community={community} onCommunityChange={() => {setRefresh(refresh + 1); setEditMode(false);}} />}
            <CommunityDetailCard community={community} members={members} />
            
            
            <button onClick={() => navigate("/community")}>Back to Overview</button>
            <br />
            <br />
            <button onClick={buttonLeave}>Leave Community</button>
        </div>
    );
}