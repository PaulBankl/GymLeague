import { useParams } from "react-router-dom";
import * as Communityservice from "../services/Communityservice";
import { useContext, useEffect, useState } from "react";
import type { Community } from "../types/Community";
import { useNavigate } from "react-router-dom";
import CommunityEdit from "../components/CommunityEdit";
import CommunityDetailCard from "../components/CommunityDetailCard";
import { AuthContext } from "../context/AuthContext";
import MemberList from "../components/MemberList";

export default function CommunityDetailPage() {
    const username = useContext(AuthContext)?.username;
    const [editMode, setEditMode] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [refresh, setRefresh] = useState(0);
    const [community, setCommunity] = useState<Community | null>(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [members, setMembers] = useState<{ username: string; role: string; joinedAt: string }[]>([]);

    if (!id) {
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
        Communityservice.leaveCommunity(Number(id)).then((success) => {
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
    if (error) {
        return <div>Server Error</div>;
    }

    if (!community) {
        return <div>Loading community details...</div>;
    }
    return (
        <>
            <div className="flex flex-col bg-surface items-center border border-border rounded-md p-4 w-[80vw] md:w-[50vw] mx-auto mt-[2vw]">
                <h1 className="font-heading mt-2 text-[clamp(22px,15vw,72px)] font-black ">{community.name}</h1>
                <p className="text-muted mb-4 ">{community.description}</p>
                {editMode && <CommunityEdit community={community} onCommunityChange={() => { setRefresh(refresh + 1); setEditMode(false); }} />}
                <CommunityDetailCard community={community} />
                {username === community.owner && (
                    <button onClick={() => setEditMode(!editMode)} className="border border-border p-2 rounded-md mt-2 text-muted">{editMode ? "Cancel" : "Edit Community"}</button>
                )}

            </div>
                <MemberList community={community} members={members} refresh={() => setRefresh(refresh + 1)} />

            <div className="flex flex-col items-center">
                <button onClick={() => navigate("/community")} className="border border-border p-2 rounded-md mt-2  text-muted">Back to Overview</button>
                <button onClick={buttonLeave} className="border border-accent p-2 rounded-md  mt-4 text-accent">Leave Community</button>
            </div>
        </>
    );
}