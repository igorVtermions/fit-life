import Image from 'next/image'
import React from 'react'

import manOnKnees from './assets/manOnKnees.png';

export default function Banner() {
  return (
    <section className='flex justify-between items-center mx-5'>
        <div className='md:max-w-[50%]'>
          <h2 className='text-[70px] leading-[50px] md:text-[150px] md:leading-[100px] lg:text-[200px] lg:leading-[150px] font-bold'>Malhe conosco</h2>
          <p className='text-zinc-400 my-10'>A huge selection of health and fitness content, healthy recipes and transformation stories to help you get fit and stay fit!</p>
          <button className='bg-orange-700 w-[170px] h-[50px] rounded-md hover:bg-orange-600 cursor-pointer'>Entre pro time!</button>
        </div>
        <picture className='hidden md:flex'>
            <Image className='h-[500px] lg:h-[650px] w-auto' src={manOnKnees} alt='homem om musculos usando camusa e shorts preto agachado amarrando sapatos de corrida na cor laranja' />
        </picture>
    </section>
  )
}
