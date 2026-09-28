import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Ranking } from "../types/Ranking";
import * as CommunityService from "../services/Communityservice";
import type { UserRanking } from "../types/UserRanking";
import RankingCard from "../components/RankingCard";


export default function RankingPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [ranking, setRanking] = useState<Ranking | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
    const [userRankings, setUserRankings] = useState<UserRanking[]>([]);

    useEffect(() => {
        if (!id) {
            setError("Invalid community ID");
            return;
        }
        const fetchRanking = async () => {
            try {
                const data = await CommunityService.getCommunityRanking(Number(id))
                setRanking(data);
                setUserRankings(data.userRankings);
            }
            catch (error) {
                console.error("Failed to fetch ranking:", error);
                setError("Failed to fetch ranking");
            }
        }
        fetchRanking();

    }, []);
    if (error) {
        return <div className="flex flex-col items-center"><p className="text-accent mt-[20vh] text-3xl">Error: {error}</p>
            <button onClick={() => navigate(`/community/${id}`)} className="border border-border p-2 rounded-md mt-2 text-3xl text-muted">Back</button>
        </div>

    }
    if (!ranking) {
        return <div className="flex flex-col items-center"><p className="text-accent mt-[20vh] text-3xl">Loading...</p>
            <button onClick={() => navigate(`/community/${id}`)} className="border border-border p-2 rounded-md mt-2 text-3xl text-muted">Back</button>
        </div>
    }
    if (ranking.exercises.length === 0) {
        return <div className="flex flex-col items-center"><p className="text-accent mt-[20vh] text-3xl">No CommunityExercises... Add Exercises to get Community ranking.</p>
            <button onClick={() => navigate(`/community/${id}`)} className="border border-border p-2 rounded-md mt-2 text-3xl text-muted">Back</button>
        </div>

    }
    if (ranking.userRankings.length === 0) {
        return <div className="flex flex-col items-center"><p className="text-accent mt-[20vh] text-3xl">No ranking data available</p>
            <button onClick={() => navigate(`/community/${id}`)} className="border border-border p-2 rounded-md mt-2 text-3xl text-muted">Back</button>
        </div>

    }
    return (
        <div className="flex flex-col items-center mt-[5vh] h-screen">
            <h1 className="font-heading text-[clamp(22px,10vw,72px)] text-center font-black tracking-[-2px]">Community Ranking <p className="text-accent">"{ranking?.communityName}"</p></h1>
            <div className="grid mx-2 grid-cols-3 gap-4 md:flex  md:gap-4 md:flex-row md:items-center">
                <button className="border bg-accent border-border p-2 rounded-md" onClick={() => setSelectedExercise(null)}>Total</button>
                {ranking.exercises.map((exercise) => (<button key={exercise.id} onClick={() => { setSelectedExercise(exercise.id) }} className="border bg-accent border-border p-2 rounded-md">{exercise.name}</button>))}
            </div>
            {selectedExercise === null && <h1 className="text-3xl font-bold my-4">Ranking for: Total</h1>}
            {selectedExercise !== null && <h1 className="text-3xl font-bold my-4">Ranking for: {ranking.exercises.find(exercise => exercise.id === selectedExercise)?.name}</h1>}
            <div className="flex flex-col items-center mt-4">
                {selectedExercise === null && userRankings.sort((a,b) => a.total - b.total).map((userRankings, index) => (<RankingCard key={userRankings.username} rank={index + 1} userName={userRankings.username} weight={userRankings.total} />))}
                {selectedExercise !== null && userRankings.sort((a,b) =>  b.Exercises.find(exercise => exercise.exerciseId === selectedExercise)?.OneRM! -a.Exercises.find(exercise => exercise.exerciseId === selectedExercise)?.OneRM!).map((userRankings, index) => {return <RankingCard key={userRankings.username} rank={index + 1} userName={userRankings.username} weight={userRankings.Exercises.find(exercise => exercise.exerciseId === selectedExercise)?.OneRM!} />})}
            </div>
        </div>
    )
}