import type { Community } from "../types/Community";
import MemberActionsButton from "./MemberActionsButton";

type CommunityDetailCardProps = {
    community: Community;
    members: { username: string; role: string; joinedAt: string }[];
    refresh?: () => void;
};

export default function CommunityDetailCard({ community, members, refresh }: CommunityDetailCardProps) {
    const username = sessionStorage.getItem("username");
    return (
        <div>
            <p>{community.description}</p>
            <p>Owner: {community.owner}</p>
            <p>Members: {community.memberCount}</p>
            <p>Created: {new Date(community.createdAt).toLocaleDateString()}</p>
            <p>Private: {community.isPrivate ? "Yes" : "No"}</p>
            
            <h2>Members</h2>
            <ul>
                {members.map((member) => (
                    <li key={member.username} className="member-item">
                        {member.username} - {member.role} - Joined: {new Date(member.joinedAt).toLocaleDateString()} 
                        {community.owner === username && member.username !== username && community.id && <MemberActionsButton communityId={community.id} memberUsername={member.username} action="kick" onSuccess={refresh} />}
                        {community.owner === username && member.username !== username && community.id && member.role !== "ADMIN" && <MemberActionsButton communityId={community.id} memberUsername={member.username} action="promote" onSuccess={refresh} />}
                        {community.owner === username && member.username !== username && community.id && member.role !== "USER"  && <MemberActionsButton communityId={community.id} memberUsername={member.username} action="demote" onSuccess={refresh} />}
                    </li>
                ))}
            </ul>
            {community.exercises.length > 0 && (
                <>
                    <h2>Exercises</h2>
                    <ul>
                        {community.exercises.map((exercise) => (
                            <li key={exercise.id}>{exercise.name}</li>
                        ))}
                    </ul>
                </>
            )}
            
            
            </div>

            
    )
}