import type { Community } from "../types/Community";

type CommunityDetailCardProps = {
    community: Community;
    members: { username: string; role: string; joinedAt: string }[];
};

export default function CommunityDetailCard({ community, members }: CommunityDetailCardProps) {
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