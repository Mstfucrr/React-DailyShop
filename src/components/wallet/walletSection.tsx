import { motion } from 'framer-motion'
import CreditCard from '../creditCard/creditCard'
import { FaTimes } from 'react-icons/fa'
import Card from '../creditCard/Card'
import { useState } from 'react'
import { InputNumber } from 'primereact/inputnumber'
import { SelectButton } from 'primereact/selectbutton'
import { addMoneyToWallet } from '@/services/wallet/wallet.service'
import to from 'await-to-js'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

type Props = {
  setIsShowWalletScreen: (value: boolean) => void
}

const WalletSection = ({ setIsShowWalletScreen }: Props) => {
  const [cardValues, setCardValues] = useState({
    cardNumber: '',
    cardOwner: '',
    LastDate: '',
    cvv: ''
  })

  const [addMoneyValue, setAddMoneyValue] = useState(0)
  const { token } = useAuth()

  const handleSubmit = async () => {
    if (addMoneyValue <= 5) return toast.error('En az 5 TL yükleyebilirsiniz')

    const [err, data] = await to(addMoneyToWallet({ Balance: addMoneyValue }, token))
    if (err) return toast.error(err.message)
    toast.success(data?.message)
    setIsShowWalletScreen(false)
  }

  return (
    <motion.div
      className='fixed left-0 top-0 z-[200] flex h-full w-full items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-50'
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1,
        display: 'flex'
      }}
      transition={{
        duration: 0.5
      }}
    >
      <div className='flex flex-row flex-wrap gap-7 rounded-lg bg-white p-5 shadow-lg'>
        <motion.div
          className='flex flex-col gap-y-4'
          initial={{
            opacity: 0,
            x: 500,
            width: 0,
            display: 'none'
          }}
          animate={{
            opacity: 1,
            x: 0,
            width: 'auto',
            display: 'flex'
          }}
          transition={{
            duration: 1
          }}
        >
          {/* hazır para miktarları buttonları */}

          <div className='flex flex-row flex-wrap gap-3'>
            {/* reset button */}

            {/* money Buttons */}
            <SelectButton
              name='money'
              id='money'
              value={addMoneyValue}
              options={[10, 20, 50, 100, 200, 500]}
              onChange={e => {
                setAddMoneyValue(e.value)
              }}
              className='flex w-auto'
              placeholder='Hazır para miktarları'
            />
          </div>
          <span className='text-lg font-semibold text-primaryDark'>Para Miktarı</span>
          <InputNumber
            name='money'
            value={addMoneyValue}
            onChange={e => {
              if (e.value) setAddMoneyValue(e.value)
            }}
            className={`w-full ${addMoneyValue <= 5 ? 'p-inputnumber-error p-invalid' : ''}`}
          />
          {addMoneyValue <= 5 && <div className='text-red-500'>En az 5 TL yükleyebilirsiniz</div>}
        </motion.div>
        {/* credit card */}

        <CreditCard setCardValues={setCardValues} cardValues={cardValues} handleSubmit={handleSubmit} />

        <div className='flex flex-col items-end gap-y-4'>
          <FaTimes
            className='float-right cursor-pointer rounded-full bg-white p-1
                                text-right text-4xl text-primary'
            onClick={() => setIsShowWalletScreen(false)}
          />
          <Card values={cardValues} />
        </div>
      </div>
    </motion.div>
  )
}

export default WalletSection
