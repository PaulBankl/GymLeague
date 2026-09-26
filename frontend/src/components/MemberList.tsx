import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { Community } from "../types/Community";
import MemberActionsButton from "./MemberActionsButton";

type MemberListProps = {
    community: Community;
    members: { username: string; role: string; joinedAt: string }[];
    refresh?: () => void;
};



export default function MemberList({ community, members, refresh }: MemberListProps) {
    const username = useContext(AuthContext)?.username;
    return (<div className="flex flex-col items-center w-[80vw] md:w-[50vw] mx-auto mt-[2vw]">
        <h2 className="text-2xl font-heading self-start mb-4">Members</h2>
        <ul>
            {members.map((member) => (
                <li key={member.username} className="flex flex-col  md:flex-row w-[80vw] md:w-[50vw] border border-border bg-surface p-2 rounded-md items-center justify-between mb-2">
                    <div className="flex flex-row items-center gap-2">
                        <p className="self-start ml -4">* {member.username}</p>
                        {member.role === "OWNER" && <p className="text-accent font-heading self-end  border-accent border rounded-md p-1 bg-surface">OWNER</p>}
                        {member.role === "ADMIN" && <p className="text-blue-500 font-heading self-end border-blue-500 border rounded-md p-1 bg-surface">ADMIN</p>}
                        {member.role === "MODERATOR" && <p className="text-green-500 font-heading self-end border-green-500  border rounded-md p-1 bg-surface">Moderator</p>}
                        {member.role === "USER" && <p className="text-muted font-heading self-end border-muted border rounded-md p-1 bg-surface">Member</p>}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center  gap-2">

                        <p className="text-muted self-end text-sm">Joined: {new Date(member.joinedAt).toLocaleDateString()}</p>
                        {community.owner === username && member.username !== username && community.id && <MemberActionsButton communityId={community.id} memberUsername={member.username} action="kick" onSuccess={refresh} />}
                        {community.owner === username && member.username !== username && community.id && member.role !== "ADMIN" && <MemberActionsButton communityId={community.id} memberUsername={member.username} action="promote" onSuccess={refresh} />}
                        {community.owner === username && member.username !== username && community.id && member.role !== "USER" && <MemberActionsButton communityId={community.id} memberUsername={member.username} action="demote" onSuccess={refresh} />}
                    </div>

                </li>
            ))}
        </ul>

    </div>)

}
