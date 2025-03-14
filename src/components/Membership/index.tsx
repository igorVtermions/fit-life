import React from 'react'

export default function Membership() {
    const plans = [1, 2]
  return (
    <section className='my-20'>
        <h2 className='text-5xl font-bold mb-10'>Planos</h2>
        <div className='flex flex-col md:flex-row gap-8 w-full items-center justify-center border-t-zinc-700 border-t-2 pt-10'>
            {plans.map((plan) => (<div key={plan} className='max-w-[320px] md:max-w-[400px] p-6 flex flex-col gap-4 bg-zinc-900'>
                <h3 className='text-2xl font-bold'>Teste grátis</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum dignissimos officia animi ex ut ea, labore recusandae omnis quasi, ullam possimus cum commodi? Quibusdam, vero.</p>
                <ul className='list-disc ml-4'>
                    <li>Lorem, ipsum dolor.</li>
                    <li>Lorem ipsum dolor sit.</li>
                    <li>Lorem, ipsum dolor.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
                </ul>
                <button className='bg-orange-700 w-[170px] h-[25px] rounded-md hover:bg-orange-600 cursor-pointer'>Entre pro time!</button>
            </div>))}
        </div>
    </section>
  )
}
