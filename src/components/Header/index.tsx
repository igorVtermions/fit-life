import React from 'react'

export default function Header() {
  return (
    <header className='h-16 bg-black flex justify-between items-center px-8'>
        <h1 className='text-2xl font-bold'><span className='text-orange-700'>Fit</span>Life</h1>
        <nav>
            <ul className='flex gap-4'>
                <li className='cursor-pointer hover:text-orange-700 transition duration-200'>Inicio</li>
                <li className='cursor-pointer hover:text-orange-700 transition duration-200'>Planos</li>
                <li className='cursor-pointer hover:text-orange-700 transition duration-200'>Contato</li>
            </ul>
        </nav>
    </header>
  )
}
