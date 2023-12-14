import { motion } from 'framer-motion'


const OrderPayment = () => {
    return (
        <motion.div className="flex flex-col basis-8/12 gap-y-3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: .4 }}

        >



        </motion.div>
    )
}

export default OrderPayment