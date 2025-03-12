import Image from 'next/image'
import React from 'react'

import WomanWorkingOut from './assets/womanWorkingOut.png';

export default function InfoBlock() {
  return (
    <section>
        <picture>
            <Image src={WomanWorkingOut} alt='Mulher jovem usando blusa branca e shorts cinza fazendo exercicio de crossfit com cordas' />
        </picture>
        <div>

        </div>
    </section>
  )
}
