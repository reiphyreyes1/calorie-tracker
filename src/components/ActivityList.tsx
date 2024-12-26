import { useMemo } from 'react'
import { Activity } from '../types'
import { categories } from '../data/category'

interface Props {
    activities: Activity[]
}

function ActivityList({ activities }: Props) {

    const categoryName = useMemo(() =>
        (category: Activity["category"]) => categories.map(item => item.id === category ? item.name : ''),
        [activities])

    return (
        <>
            <h2 className='text-4xl font-bold text-slate-600 text-center'>Comida y Actividades</h2>

            {activities.map(item =>
                <div
                    key={item.id}
                    className='px-5 py-10 bg-white mt-5 flex justify-between'
                >
                    <div className='space-y-2 relative'>
                        <p
                            className={`absolute -top-8 -left-8 px-10 py-2 text-white font-bold uppercase
                                ${item.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}
                        >
                            {categoryName(+item.category)}
                        </p>
                        <p className='text-2xl font-bold pt-5'>{item.name}</p>
                        <p className='font-black text-4xl text-lime-500'>
                            {item.calories}{' '}
                            <span>Calorias</span>
                        </p>
                    </div>

                    <div>
                        b
                    </div>
                </div>
            )}
        </>
    )
}

export default ActivityList