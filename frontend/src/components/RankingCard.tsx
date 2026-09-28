import type { JSX } from "react/jsx-runtime";

type RankingCardProps = {
    rank: number;
    userName: string;
    weight: number;
};



export default function RankingCard({ rank, userName, weight }: RankingCardProps): JSX.Element {

    return(<div className="flex flex-row items-center w-[80vw] md:w-[50vw] mt-2 border border-border bg-surface p-2 rounded-md justify-between">
        {rank < 4 && <p className="text-green-500 ">{rank}</p>}
        {rank >= 4 && <p className="text-muted">{rank}</p>}
        <p className="mx-4 text-muted">|</p>
        <p>{userName}</p>
        <p className="text-muted">One Rep Max: <span className="text-green-500">{weight.toFixed(2)}</span></p>
    </div>)
}