import React from 'react'

import dieta from '../../Data/dieta.json';

export default function Dieta() {

const dietaCompleta = dieta.dieta

  return (
    <section className='w-full flex max-w-[1280px] overflow-auto gap-4'>
        {dietaCompleta.days.map((dieta) => (<div key={dieta.day} className='bg-zinc-900 min-w-[340px] p-2.5 rounded-sm'>
            <h2 className='text-xl font-bold uppercase'>{dieta.day}</h2>
            <ul className='flex flex-col gap-4'>
                {dieta.meals.map((meals) => (<li key={meals.meal} className='hover:bg-zinc-800 pl-1 py-1 rounded-sm'><span>{meals.time} - </span>{meals.meal}</li>))}
            </ul>
        </div>))}
    </section>
  )
}
