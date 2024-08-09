import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import bg from '@/assets/images/card/bg.png'
import master from '@/assets/images/card/master.png'
import visa from '@/assets/images/card/visa.svg'
import Image from 'next/image'

type Props = {
  values: {
    cardOwner: string
    cardNumber: string
    LastDate: string
    cvv: string
  }
}

const Card = ({ values }: Props) => {
  const [cardType, setCardType] = useState('' as string)

  const handleChangeCardNumber = (e: any) => {
    const cardNumber = e.target.value
    if (cardNumber.startsWith('4')) {
      setCardType('visa')
    } else if (cardNumber.startsWith('5')) {
      setCardType('master')
    } else {
      setCardType('')
    }
  }

  useEffect(() => {
    handleChangeCardNumber({ target: { value: values.cardNumber } })
  }, [values.cardNumber])

  return (
    <motion.div
      className='relative m-auto h-56 w-96 rounded-xl bg-red-100 text-white shadow-2xl'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      // döne döne geliyor
      initial={{ rotateY: 0, scale: 0.4 }}
      animate={{ rotateY: 360, scale: 1 }}
      transition={{ duration: 1.7 }}
    >
      <Image
        className='relative size-full rounded-xl object-cover'
        src={bg.src}
        width={384}
        height={256}
        alt='card'
        style={cardType === 'visa' ? { filter: 'none' } : { filter: 'grayscale(1)' }}
      />

      <div className='absolute top-8 w-full px-8'>
        <div className='flex justify-between'>
          <div>
            <p className='font-light'>Kart Sahibi</p>
            <p className='font-medium tracking-widest'>{values.cardOwner ? values.cardOwner : '--------'}</p>
          </div>
          {cardType === 'visa' ? (
            <Image className='size-16' width={64} height={64} src={visa.src} alt='card type' />
          ) : cardType === 'master' ? (
            <Image className='size-16' width={64} height={64} src={master.src} alt='card type' />
          ) : null}
        </div>
        <div className='pt-1'>
          <p className='font-light'>Kart Numarası</p>
          <p className='tracking-more-wider font-medium'>
            {values.cardNumber ? values.cardNumber : '---- ---- ---- ----'}
          </p>
        </div>
        <div className='pr-6 pt-6'>
          <div className='flex justify-between'>
            <div className=''>
              <p className='text-xs font-light'>Son Kullanma Tarihi</p>
              <p className='text-sm font-medium tracking-wider'>{values.LastDate ? values.LastDate : '--/----'}</p>
            </div>

            <div className=''>
              <p className='text-xs font-light'>CVV</p>
              <p className='tracking-more-wider text-sm font-bold'>{values.cvv ? values.cvv : '---'}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Card
