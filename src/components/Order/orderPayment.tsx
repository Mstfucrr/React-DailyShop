import { motion } from 'framer-motion'
import Card from '../creditCard/Card'
import CreditCard from '../creditCard/creditCard'

type Props = {
  cardValues: {
    cardNumber: string
    cardOwner: string
    LastDate: string
    cvv: string
  }
  setcardValues: (values: any) => void
  handleSubmitOrder: () => void
}

const OrderPayment = ({ cardValues, setcardValues, handleSubmitOrder }: Props) => {
  return (
    <motion.div
      className='flex basis-8/12 flex-col gap-y-3'
      animate={{
        y: 0,
        opacity: 1,
        display: 'flex'
      }}
      initial={{
        y: 500,
        opacity: 1,
        display: 'none'
      }}
      transition={{
        duration: 0.5
      }}
    >
      <h3 className='text-3xl font-semibold text-primaryDark'>Ödeme Bilgileri</h3>
      <div className='flex flex-row gap-7 rounded-lg p-5 shadow-lg max-lg:flex-wrap'>
        <CreditCard setCardValues={setcardValues} cardValues={cardValues} handleSubmit={handleSubmitOrder} />
        <Card values={cardValues} />
      </div>
    </motion.div>
  )
}

export default OrderPayment
