import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import dieta from '../../Data/dieta.json';

export default function Dieta() {

const dietaCompleta = dieta.dieta

  return (
    <section>
      <Dialog>
        <DialogTrigger className='bg-orange-700 w-[170px] h-[50px] rounded-md hover:bg-orange-600 cursor-pointer my-8'>Adicionar refeição</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-black'>Adicione uma refeição</DialogTitle>
            <input type="text" placeholder='Refeição' className='text-black placeholder:text-gray-800 pl-2' />
            <input type="time" className='text-black pl-2' />
            <select className='text-black pl-2'>
              <option value="domingo">domingo</option>
              <option value="segunda">segunda-feira</option>
              <option value="terça">terça-feira</option>
              <option value="quarta">quarta-feira</option>
              <option value="quinta">quinta-feira</option>
              <option value="sexta">sexta-feira</option>
              <option value="sabado">sabado</option>
            </select>
            <button className='bg-orange-700 w-[170px] h-[50px] rounded-md hover:bg-orange-600 cursor-pointer my-4'>Adicionar</button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
    <div className='w-full flex max-w-[1280px] overflow-auto gap-4'>
        {dietaCompleta.days.map((dieta) => (<div key={dieta.day} className='bg-zinc-900 min-w-[340px] p-2.5 rounded-sm'>
            <h2 className='text-xl font-bold uppercase'>{dieta.day}</h2>
            <ul className='flex flex-col gap-4'>
                {dieta.meals.map((meals) => (<li key={meals.meal} className='hover:bg-zinc-800 pl-1 py-1 rounded-sm'><span>{meals.time} - </span>{meals.meal}</li>))}
            </ul>
        </div>))}
    </div>
    </section>
  )
}
