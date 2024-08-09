'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export enum AccountTabs {
  USER_INFO = 'user-info',
  USER_ORDERS = 'user-orders',
  USER_PRODUCTS = 'user-products'
}

interface TabButtonsProps {
  label: string
  value: AccountTabs
  activeTab: AccountTabs
}

const TabButtons = ({ label, value, activeTab }: TabButtonsProps) => {
  return (
    <motion.li
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={{
        hidden: { opacity: 0, x: -100 },
        show: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.2 }}
      className='w-full'
      key={value}
    >
      <Link
        href={`/account/${value}`}
        className={`block w-full rounded-2xl border border-solid py-[15px] text-center text-lg font-medium
                  ${
                    activeTab == value
                      ? 'border-[#ddd] bg-primary text-white'
                      : 'border-primary bg-white text-primaryDark'
                  }                    
                  bg-primary hover:border-primary hover:bg-primary
                  hover:text-white`}
      >
        {label}
      </Link>
    </motion.li>
  )
}

export default TabButtons
