import { Link } from "react-router-dom";
import type { Community } from "../types/Community";
import { useEffect, useState, useContext } from "react";
import * as CommunityService from "../services/Communityservice";
import { AuthContext } from "../context/AuthContext";

export default function AllCommunityPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        CommunityService.get10RandomCommunities().then(setCommunities).catch((error) => {
            console.error("Error fetching communities:", error);
            setError(true);
        });
    }, []);

    const username = useContext(AuthContext);

    if (!username) {
        return (<><p>You need to be logged in to view this page.</p><br></br><Link to="/login">Go to Login</Link></>);
    }

    if (error) {
        return (<><p>Server Error</p><br></br><Link to="/community">Back to Community</Link></>);
    }

    if (communities.length === 0) {
        return (<><div>No communities found.</div><Link to="/community">Back to Community</Link></>);
    }
    return (
        <div className="flex flex-col items-center w-[80vw] md:w-[50vw] mx-auto h-screen mt-[2vw]">
            <Link to="/community" className="text-accent underline underline-offset-4 self-start">Back to Community</Link>
            <h1 className="font-heading text-[clamp(22px,10vw,72px)] text-center font-black tracking-[-2px]">All Communities</h1>
            <p className="text-muted text-center">Here you can find 10 random communities, if you look for something specific a search function will be implemented in the future!</p>
            {communities.map(community => (
                <div key={community.id} className="w-full items-center flex flex-col">
                    <div className="flex flex-col items-center bg-surface rounded-md border border-border p-4 mb-4 w-[90%] md:w-[80%] mt-5" >
                        <h2 className="text-lg font-heading text-[clamp(20px,2vw,50px)] font-bold mb-2">{community.name}</h2>
                        <p className="max-w-[80%] whitespace-normal break-words text-center text-muted">{community.description}</p>
                        <Link to={`/community/public/${community.id}`}className="text-accent underline underline-offset-4 ">View Community</Link>
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