import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import UserInformation from './userSettings/userInformation'
import UserProducts from './userProducts/userProducts'
import UserOrders from './userOrders/userOrders'
import to from 'await-to-js'
import { authService } from '@/services/auth/auth.service'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import { AccountTabs } from '@/app/account/[tab]/page'
import Link from 'next/link'

const TabButtons = ({ label, value, activeTab }: { label: string; value: AccountTabs; activeTab: AccountTabs }) => {
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

const Account = ({ tab }: { tab: AccountTabs }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const [activeTab, setActiveTab] = useState<AccountTabs>(AccountTabs.USER_INFO)

  const { isAuthorized, token, setUser, auth: user } = useAuth()

  const fetchUser = async () => {
    if (isAuthorized) {
      setLoading(true)
      const [err, data] = await to(authService.getAccount(token))
      if (err) {
        setLoading(false)
        toast.error(err.message)
        return
      }
      setUser(data.data)
      setLoading(false)
    } else toast.error('Bu sayfayı görüntülemek için giriş yapmalısınız.')
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (tab) {
      switch (tab) {
        case AccountTabs.USER_INFO:
          setActiveTab(AccountTabs.USER_INFO)
          break
        case AccountTabs.USER_ORDERS:
          setActiveTab(AccountTabs.USER_ORDERS)
          break
        case AccountTabs.USER_PRODUCTS:
          setActiveTab(AccountTabs.USER_PRODUCTS)
          break
        default:
          break
      }
    }
  }, [tab])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

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
          <div className=' w-full'>
            <AnimatePresence>
              {loading ? (
                <motion.div
                  key='loading'
                  className='flex h-full w-full items-center justify-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProgressSpinner />
                </motion.div>
              ) : (
                user && (
                  <>
                    {activeTab === AccountTabs.USER_INFO && <UserInformation />}
                    {activeTab === AccountTabs.USER_ORDERS && <UserOrders />}
                    {activeTab === AccountTabs.USER_PRODUCTS && <UserProducts />}
                  </>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
