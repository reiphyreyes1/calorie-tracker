import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { categories } from '../data/category'
import type { Activity } from '../types'
import { ActivityActions, ActivityState } from '../reducers/activityReducer';

interface Props {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0
}

function Form({ dispatch, state }: Props) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter(item => item.id === state.activeId)[0];
            setActivity(selectedActivity);
        }

    }, [state.activeId])

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const IsNumberField = ['category', 'calories'].includes(event.target.id);

        setActivity({
            ...activity,
            [event.target.id]: IsNumberField ? +event.target.value : event.target.value
        })
    }

    const isValidActivity = () => {
        const { calories, name } = activity;

        return name.trim() !== '' && calories > 0;
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch({ type: "save-activity", payload: { newActivity: activity } });

        setActivity({ ...initialState, id: uuidv4() })
    }

    useEffect(() => {

    }, [activity]);

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white shadow p-10 rounded-lg"
        >
            <div
                className="grid grid-cols-1 gap-3"
            >
                <label htmlFor="category" className='font-bold'>Categoría:</label>
                <select
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {
                        categories.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                            >{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className='grid grid-cols-1 gap-3'>
                <label
                    htmlFor="name"
                    className='font-bold'
                >Actividad:</label>

                <input
                    id='name'
                    type="text"
                    className='border border-slate-300 rounded-lg p-2'
                    placeholder='Ej. Comida, Jugo de naranja, etc.'
                    value={activity.name}
                    onChange={handleChange}

                />
            </div>

            <div className='grid grid-cols-1 gap-3'>
                <label
                    htmlFor="calories"
                    className='font-bold'
                >Calorias:</label>

                <input
                    id='calories'
                    type="number"
                    className='border border-slate-300 rounded-lg p-2'
                    placeholder='Calorias 300, 500, etc.'
                    value={activity.calories}
                    onChange={handleChange}

                />
            </div>

            <input
                type="submit"
                value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
                className='bg-gray-800 hover:bg-gray-900 px-5 p-2
                text-white w-full font-bold uppercase rounded-lg cursor-pointer disabled:opacity-10'
                disabled={!isValidActivity()}
            />
        </form>
    )
}

export default Form;