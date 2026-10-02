import { Link, useNavigate } from "react-router-dom";
import type { Community } from "../types/Community";
import { useEffect, useState} from "react";
import * as CommunityService from "../services/Communityservice";

export default function AllCommunityPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [error, setError] = useState(false);
    const [showJoinCodeInput, setShowJoinCodeInput] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const [communityName, setCommunityName] = useState("");
    const [joinError, setJoinError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        CommunityService.get10RandomCommunities().then(setCommunities).catch((error) => {
            console.error("Error fetching communities:", error);
            setError(true);
        });
    }, []);


    if (error) {
        return (<><p>Server Error</p><br></br><Link to="/community">Back to Community</Link></>);
    }

    if (communities.length === 0) {
        return (<><div>No communities found.</div><Link to="/community">Back to Community</Link></>);
    }

    async function handleJoinCode() {
        if (!joinCode.trim() || !communityName.trim()) {
            setJoinError("Both community name and join code are required.");
            return;
        }
        try {
            const response = await CommunityService.joinCommunityWithCode(joinCode, communityName);
            if (response) {
                navigate(`/community/`);
                setShowJoinCodeInput(false);
                setJoinError("");
            } else {
                setJoinError("Failed to join community. Please check the name and code.");
            }
        } catch (error) {
            console.error("Error joining community:", error);
            setJoinError(error instanceof Error ? error.message : "An unexpected error occurred.");
        }

    }

    return (
        <div className="flex flex-col items-center w-[80vw] md:w-[50vw] mx-auto h-screen mt-[2vw]">
            <Link to="/community" className="text-accent underline underline-offset-4 self-start">Back to Community</Link>
            <h1 className="font-heading text-[clamp(22px,10vw,72px)] text-center font-black tracking-[-2px]">All Communities</h1>
            <p className="text-muted text-center">Here you can find 10 random communities, if you look for something specific a search function will be implemented in the future!</p>
            <button onClick={() => setShowJoinCodeInput(!showJoinCodeInput)} className="border border-accent text-white  rounded-md p-2 bg-accent mt-4">Join Community with Code</button>
            {showJoinCodeInput && (<p className="text-red-500">{joinError}</p>)}
            {showJoinCodeInput && (
                <div>
                    <form>
                        <input
                            type="text"
                            placeholder="Community Name"
                            value={communityName}
                            onChange={(e) => setCommunityName(e.target.value)}
                            className="border border-border rounded-md p-2 mt-2 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Join Code"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            className="border border-border rounded-md p-2 mt-2 w-full"
                        />
                        <button
                            type="button"
                            onClick={handleJoinCode}
                            className="border border-accent text-white rounded-md p-2 bg-accent mt-2 w-full"
                        >
                            Join
                        </button>
                    </form>
                </div>
            )}
            {communities.map(community => (
                <div key={community.id} className="w-full items-center flex flex-col">
                    <div className="flex flex-col items-center bg-surface rounded-md border border-border p-4 mb-4 w-[90%] md:w-[80%] mt-5" >
                        <h2 className="text-lg font-heading text-[clamp(20px,2vw,50px)] font-bold mb-2">{community.name}</h2>
                        <p className="max-w-[80%] whitespace-normal break-words text-center text-muted">{community.description}</p>
                        <Link to={`/community/public/${community.id}`} className="text-accent underline underline-offset-4 ">View Community</Link>
                        <div className="flex flex-col items-start justify-between mt-2 md:flex-row">
                            <div className="flex flex-row mr-4">
                                <p className="text-muted mr-2">Owner: </p>
                                <p className="font-body">{community.owner}</p>
                            </div>

                            <div className="flex flex-row mr-4">
                                <p className="text-muted mr-2"> Created At: </p>
                                <p className="font-body"> {new Date(community.createdAt).toLocaleDateString()}</p>
                            </div>

                            <div className="flex flex-row mr-4">
                                <p className="text-muted mr-2">Private: </p>
                                <p className="font-body">{community.isPrivate ? "Yes" : "No"}</p>
                            </div>

                            <div className="flex flex-row mr-4">
                                <p className="text-muted mr-2">Members: </p>
                                <p className="font-body">{community.memberCount}</p>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
}