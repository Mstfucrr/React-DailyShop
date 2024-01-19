import { IUser } from '@/services/auth/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import UserInformation from './userSettings/userInformation'
import { useDispatch, useSelector } from 'react-redux'
import { SET_AUTH, authSelector } from '@/store/auth'
import UserProducts from './userProducts/userProducts'
import UserOrders from './userOrders/userOrders'
import { useParams } from 'react-router-dom'
import to from 'await-to-js'
import { authService } from '@/services/auth/auth.service'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import { ProgressSpinner } from 'primereact/progressspinner'

const Account = () => {
  const { tab } = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  enum AccountTabs {
    USER_INFO = 'Kullanıcı Bilgilerim',
    USER_ORDERS = 'Siparişlerim',
    USER_PRODUCTS = 'Ürünlerim'
  }
  const [activeTab, setActiveTab] = useState<AccountTabs>(AccountTabs.USER_INFO)

  const [user, setUser] = useState<IUser | null>(null)
  const { isAuthorized, token } = useSelector(authSelector)
  const dispatch = useDispatch()

  const fetchUser = useCallback(async () => {
    setLoading(true)
    const [err, data] = await to(authService.getAccount(token))
    if (err) {
      setLoading(false)
      const toast: IToast = {
        severity: 'error',
        summary: 'Hata',
        detail: err.message,
        life: 5000
      }
      dispatch(SET_TOAST(toast))
      return
    }
    setUser(data.data)
    dispatch(
      SET_AUTH({
        user: data.data,
        token: token
      })
    )
    setLoading(false)
  }, [dispatch, token])

  useEffect(() => {
    if (isAuthorized) fetchUser()
    else {
      const toast: IToast = {
        severity: 'error',
        summary: 'Hata',
        detail: 'Giriş yapmalısınız',
        life: 5000
      }
      dispatch(SET_TOAST(toast))
    }
  }, [dispatch, fetchUser, isAuthorized])

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
  }, [AccountTabs.USER_INFO, AccountTabs.USER_ORDERS, AccountTabs.USER_PRODUCTS, tab])

  const renderTabsButtons = (label: string, value: AccountTabs) => (
    <motion.a
      href={`/account/${value}`}
      className={`rounded-2xl border border-solid py-[15px] text-center text-lg font-medium
                    ${
                      activeTab == value
                        ? 'border-[#ddd] bg-primary text-white'
                        : 'border-primary bg-white text-primaryDark'
                    }                    
                    bg-primary hover:border-primary hover:bg-primary
                    hover:text-white`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={{
        hidden: { opacity: 0, x: -100 },
        show: { opacity: 1, x: 0 }
      }}
    >
      {label}
    </motion.a>
  )

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
              {renderTabsButtons('Kullanıcı Bilgilerim', AccountTabs.USER_INFO)}
              {renderTabsButtons('Siparişlerim', AccountTabs.USER_ORDERS)}
              {renderTabsButtons('Ürünlerim', AccountTabs.USER_PRODUCTS)}
            </motion.div>
          </div>
          <div className=' w-full'>
            <AnimatePresence>
              {loading && (
                <div className='flex h-full w-full items-center justify-center'>
                  <ProgressSpinner />
                </div>
              )}
              {!loading && user && activeTab == AccountTabs.USER_INFO && <UserInformation user={user} />}
              {!loading && user && activeTab == AccountTabs.USER_ORDERS && <UserOrders />}
              {!loading && user && activeTab == AccountTabs.USER_PRODUCTS && <UserProducts />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
