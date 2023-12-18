import { motion } from "framer-motion"
import { useEffect, useState } from "react"


type Props = {
    values: {
        cardOwner: string,
        cardNumber: string,
        LastDate: string,
        cvv: string,
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
        <motion.div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            // döne döne geliyor
            initial={{ rotateY: 0, scale: 0.4 }}
            animate={{ rotateY: 360, scale: 1 }}
            transition={{ duration: 1.7 }}
            
        >

            <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png"
                alt="card"
                style={ cardType === 'visa' ? { filter: 'none' } : { filter: 'grayscale(1)' } }
            />

            <div className="w-full px-8 absolute top-8">
                <div className="flex justify-between">
                    <div className="">
                        <p className="font-light">
                            Kart Sahibi
                        </p>
                        <p className="font-medium tracking-widest">
                            {values.cardOwner ? values.cardOwner : '--------'}

                        </p>
                    </div>
                    {/* masetr : https://i.imgur.com/bbPHJVe.png , visa : https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg*/}
                    <img className="w-16 h-16" 
                        src={ cardType === 'visa' ? 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg' : 'https://i.imgur.com/bbPHJVe.png' }
                        alt="card type"
                    />
                </div>
                <div className="pt-1">
                    <p className="font-light">
                        Kart Numarası
                    </p>
                    <p className="font-medium tracking-more-wider">
                        {values.cardNumber ? values.cardNumber : '---- ---- ---- ----'}
                    </p>
                </div>
                <div className="pt-6 pr-6">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="font-light text-xs">
                                Son Kullanma Tarihi
                            </p>
                            <p className="font-medium tracking-wider text-sm">
                                {values.LastDate ? values.LastDate : '--/----'}
                            </p>
                        </div>

                        <div className="">
                            <p className="font-light text-xs">
                                CVV
                            </p>
                            <p className="font-bold tracking-more-wider text-sm">
                                {values.cvv ? values.cvv : '---'}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default Card