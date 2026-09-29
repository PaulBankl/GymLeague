
export type CommunityActivity = {
    id:number;
    username: string;
    message: string;
    createdAt: string;
    tone: ActivityTone;
}



    


type ActivityTone = "POSITIVE" | "NEGATIVE" | "NEUTRAL";
