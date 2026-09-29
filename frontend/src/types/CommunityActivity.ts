
export type CommunityActivity = {
    id:number;
    username: string;
    message: string;
    createdAt: Date;
    tone: ActivityTone;
}



    


type ActivityTone = "POSITIVE" | "NEGATIVE" | "NEUTRAL";
