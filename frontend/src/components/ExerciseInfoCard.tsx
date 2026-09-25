import { useEffect, useState } from "react";
import type { Entry } from "../types/Entry";
import * as Exerciseservice from "../services/Exerciseservice";

export default function ExerciseInfoCard({ id, refresh }: { id: string, refresh: number }) {
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<{ entryCount: number; bestEntry: Entry | null; progressPercent: number; progressOneRm: number } | null>(null);


    if (!id) {
        return (<div>Invalid exercise.</div>);
    }
    useEffect(() => {
        Exerciseservice.getExerciseInfoById(id)
            .then(setInfo)
            .catch((error: Error) => {
                console.error("Error fetching exercise info:", error);
                setError(error.message);
            });
    }, [id,  refresh]);
    if (error) {
        return (<div>Error Loading stats</div>);
    }
    return (
        <div className="bg-surface border border-border items-center flex flex-col rounded-md p-2 mb-4 w-[80vw] md:w-[50vw]">
            <h1 className="font-heading self-center mb-3">EXERCISE STATS</h1>
            {info && (
                <div className="grid w-full  grid-cols-1 gap-6 text-center text-xl font-semibold md:grid-cols-4">
                    <div className="flex flex-col items-center">
                        <p className="font-heading text-muted text-sm">Entries: </p>
                        <p className="font-heading text-sm mt-1 mb-4">{info.entryCount}</p>
                    </div>
                    
                    
                        <div className="flex flex-col items-center">
                        <p className="font-heading text-muted text-sm">Best Entry:  </p>
                        {(info.bestEntry ?<p className="font-heading text-sm mt-1">{info.bestEntry.weight} kg x {info.bestEntry.reps} reps</p> : <p className="font-heading text-sm mt-1">N/A</p>)}
                    </div>
                      <div>
                        <p className="font-heading text-muted text-sm">Progress: </p>
                        <p className="font-heading text-sm mt-1 mb-4">{info.progressPercent.toFixed(2)}%</p>
                      </div>
                    <div className="flex flex-col items-center">
                        <p className="font-heading text-muted text-sm">1RM Progress: </p>
                        <p className="font-heading text-sm mt-1 mb-4">{info.progressOneRm.toFixed(2)} kg</p>
                    </div>
                </div>
            )}
        </div>
    );
}