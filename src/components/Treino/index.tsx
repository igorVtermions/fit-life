import React from 'react'

import treino from '../../Data/exercicios.json';

export default function Treino() {

  const treinoCompleto = treino.treino

  return (
    <section>
    <button className='bg-orange-700 w-[170px] h-[50px] rounded-md hover:bg-orange-600 cursor-pointer my-8'>Adicionar exercício</button>
    <div className='w-full flex max-w-[1280px] overflow-auto gap-4'>
        {treinoCompleto.days.map((treino) => (<div key={treino.day} className='bg-zinc-900 min-w-[340px] p-2.5 rounded-sm'>
            <h2 className='text-xl font-bold uppercase'>{treino.day}</h2>
            <p className='mb-5 text-sm text-zinc-400'>{treino.exercises[0].exercicio}</p>
            <ul className='flex flex-col gap-4'>
                {treino.exercises[0].exercicios.map((exercise) => (<li key={exercise} className='hover:bg-zinc-800 pl-1 py-1 rounded-sm'>{exercise}</li>))}
            </ul>
        </div>))}
    </div>
    </section>
  )
}
