import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import bg from '@/assets/images/card/bg.png'
import master from '@/assets/images/card/master.png'
import visa from '@/assets/images/card/visa.svg'

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
      <img
        className='relative h-full w-full rounded-xl object-cover'
        src={bg.src}
        alt='card'
        style={cardType === 'visa' ? { filter: 'none' } : { filter: 'grayscale(1)' }}
      />

      <div className='absolute top-8 w-full px-8'>
        <div className='flex justify-between'>
          <div className=''>
            <p className='font-light'>Kart Sahibi</p>
            <p className='font-medium tracking-widest'>{values.cardOwner ? values.cardOwner : '--------'}</p>
          </div>
          {/* masetr : https://i.imgur.com/bbPHJVe.png , visa : https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg*/}
          <img className='h-16 w-16' src={cardType === 'visa' ? visa : master} alt='card type' />
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
