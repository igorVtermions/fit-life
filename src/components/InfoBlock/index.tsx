import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface InfoBlockProps{
    image: StaticImageData;
    title: string;
    subtitle: string;
    buttonText: string;
    reverse: boolean;
}

export default function InfoBlock({image, title, subtitle, buttonText, reverse}: InfoBlockProps) {
  return (
    <section className={`flex flex-col items-center justify-center ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-9 my-10`}>
        <picture className='min-w-[350px] md:min-w-[500px]'>
            <Image className='w-[350px] w-[500px]' src={image} alt='Mulher jovem usando blusa branca e shorts cinza fazendo exercicio de crossfit com cordas' />
        </picture>
        <div className='flex flex-col gap-5 text-center md:text-left items-center md:items-start'>
            <h3 className='text-6xl font-bold'>{title}</h3>
            <p className='text-zinc-400'>{subtitle}</p>
            <button className='bg-orange-700 w-[170px] h-[50px] rounded-md hover:bg-orange-600 cursor-pointer'>{buttonText}</button>
        </div>
    </section>
  )
}
