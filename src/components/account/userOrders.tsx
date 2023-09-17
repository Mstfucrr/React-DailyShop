import { motion } from 'framer-motion'

const UserOrders = () => {
    
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className="w-full px-[15px] relative"
        >
            <h3 className="text-4xl my-4 text-primaryDark
                                                        ">
                Siparişlerim
            </h3>




        </motion.div>
    )
}

export default UserOrders