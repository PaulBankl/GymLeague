import type { CommunityActivity } from "../types/CommunityActivity";

export default function ActivityLogCard({ activities }: { activities: CommunityActivity[] }) {
    return (<div className="flex flex-col items-center border-border border bg-surface-2 rounded-md p-4 w-[80vw] md:w-[50vw] mx-auto mt-[2vw]">
                <h1 className="font-heading mt-2 text-[clamp(10px,10vw,50px)] font-black ">Activity log</h1>
                {activities.length === 0 ? <p className="text-muted text-center mt-5">No activities found.</p> : (activities.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()).map((activity) => (
                    <div key={activity.id} className="border border-border rounded-md p-2 mt-2 w-full">
                        <p className="text-muted text-sm">{new Date(activity.createdAt).toLocaleString()}</p>
                        <p className="text-white">{activity.message}</p>
                    </div>
                )))}
            </div>)
}