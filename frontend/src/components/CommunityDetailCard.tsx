import type { Community } from "../types/Community";

type CommunityDetailCardProps = {
    community: Community;
};

export default function CommunityDetailCard({ community}: CommunityDetailCardProps) {
    
    return (
        <div>
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


    )
}