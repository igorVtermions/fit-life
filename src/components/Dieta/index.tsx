"use client"
import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Dieta() {

const [diet, setDiet] = useState([{}])

const [snackInfo, setSnackInfo] = useState({
  snack: '',
  time: '',
  day: 'domingo',
});

const addDiet = () =>{

  setDiet([...diet, snackInfo]);

  console.log(diet);
}

const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']

  return (
    <section>
      <Dialog>
        <DialogTrigger className='bg-orange-700 w-[170px] h-[50px] rounded-md hover:bg-orange-600 cursor-pointer my-8'>Adicionar refeição</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-black'>Adicione uma refeição</DialogTitle>
            <input value={snackInfo.snack} type="text" placeholder='Refeição' onChange={(e) => setSnackInfo({snack: e.target.value, time: snackInfo.time, day: snackInfo.day})} className='text-black placeholder:text-gray-800 pl-2' />
            <input value={snackInfo.time} type="time" onChange={(e) => setSnackInfo({snack: snackInfo.snack, time: e.target.value, day: snackInfo.day})} className='text-black pl-2' />
            <select value={snackInfo.day} onChange={(e) => setSnackInfo({snack: snackInfo.snack, time: snackInfo.time, day: e.target.value}) } className='text-black pl-2'>
              <option value="domingo">domingo</option>
              <option value="segunda">segunda-feira</option>
              <option value="terça">terça-feira</option>
              <option value="quarta">quarta-feira</option>
              <option value="quinta">quinta-feira</option>
              <option value="sexta">sexta-feira</option>
              <option value="sabado">sabado</option>
            </select>
            <button className='bg-orange-700 w-[170px] h-[50px] rounded-md hover:bg-orange-600 cursor-pointer my-4' onClick={addDiet}>Adicionar</button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
    <div className='w-full flex max-w-[1280px] overflow-auto gap-4'>
        {weekDays.map((day) => ( <div key={day} className='bg-zinc-900 min-w-[340px] p-2.5 rounded-sm'>
          <h2 className='text-xl font-bold uppercase'>{day}</h2>
          <ul className='flex flex-col gap-4'>
              {diet.filter((diet) => diet.day == day.toLowerCase()).map((diet) => (<li key={diet.time} className='hover:bg-zinc-800 pl-1 py-1 rounded-sm'><span>{diet.time} - </span>{diet.snack}</li>))}
          </ul>
      </div>))}
    </div>
    </section>
  )
}
