import { useMemo } from "react";
import { Activity } from "../types";
import CaloryDisplay from "./CaloryDisplay";

interface Props {
    activities: Activity[]
}


function Calorytracker({ activities }: Props) {

    //Counters 
    const caloriesConsumed = useMemo(() => activities.reduce((total, item) => item.category === 1 ?
        total + item.calories :
        total, 0), [activities]);

    const caloriesBurned = useMemo(() => activities.reduce((total, item) => item.category === 2 ?
        total + item.calories :
        total, 0), [activities]);

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned]);

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">
                Resumen de Calorias
            </h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CaloryDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                    color="text-lime-500"
                />

                <CaloryDisplay
                    calories={caloriesBurned}
                    text="Gastadas"
                    color="text-orange-500"
                />

                <CaloryDisplay
                    calories={netCalories}
                    text="Diferencia"
                    color={netCalories < 0 ? "text-red-500" : "text-lime-500"}
                />
            </div>
        </>
    )
}
export default Calorytracker;