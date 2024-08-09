'use client'
import TabButtons, { AccountTabs } from '@/components/account/TabButtons'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface AccountLayoutProps {
  children: React.ReactNode
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const pathName = usePathname()
  const [activeTab, setActiveTab] = useState<AccountTabs>(AccountTabs.USER_INFO)

  useEffect(() => {
    const path = pathName.split('/')[2] as AccountTabs
    setActiveTab(path)
  }, [pathName])

  return (
    <div className='mt-12 min-h-screen w-full sm:mt-[130px]'>
      <div className='mx-auto w-full md:w-11/12 lg:w-9/12'>
        <div className='flex w-full flex-col gap-x-7 md:flex-row'>
          <div className='my-10 w-full basis-5/12 px-[15px]'>
            <h3 className='my-4 text-4xl text-primaryDark '>Hesabım</h3>
            <motion.div className='flex w-full flex-col gap-2' variants={container} initial='hidden' animate='show'>
              <ul className='flex flex-col gap-2'>
                <TabButtons label='Kullanıcı Bilgilerim' value={AccountTabs.USER_INFO} activeTab={activeTab} />
                <TabButtons label='Siparişlerim' value={AccountTabs.USER_ORDERS} activeTab={activeTab} />

                <TabButtons label='Ürünlerim' value={AccountTabs.USER_PRODUCTS} activeTab={activeTab} />
              </ul>
            </motion.div>
          </div>
          <div className=' w-full'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
