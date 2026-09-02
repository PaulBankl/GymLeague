import { useParams } from "react-router-dom";
import * as Communityservice from "../services/Communityservice";
import { useEffect, useState } from "react";
import type { Community } from "../types/Community";
import { useNavigate } from "react-router-dom";

export default function CommunityDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [community, setCommunity] = useState<Community | null>(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    if(!id) {
        return <div>Invalid community ID</div>;
    }
    useEffect(() => {
        Communityservice.getCommunityDetails(Number(id)).then((data) => {
            setCommunity(data);
        }).catch((error) => {
            setError(true);
        });
    }, [id]);

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
            <p>{community.description}</p>
            <p>Owner: {community.owner}</p>
            <p>Members: {community.memberCount}</p>
            <p>Created: {community.createdAt}</p>
            <p>Private: {community.isPrivate ? "Yes" : "No"}</p>
            <button onClick={buttonLeave}>Leave Community</button>
        </div>
    );
}