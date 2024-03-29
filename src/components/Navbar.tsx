import useMediaQuery from '@/hooks/useMedia'
import { useEffect, useRef, useState } from 'react'

import { IoIosArrowDown, IoIosMenu } from 'react-icons/io'
import HeaderCarousel from './Header/HeaderCarousel'
import { useOnClickOutside } from 'usehooks-ts'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from 'primereact/button'
import { authSelector, SET_LOGOUT } from '@/store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import categoryService from '@/services/category/category.service'
import to from 'await-to-js'
import { ICategory } from '@/shared/types'

const Navbar = () => {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([] as ICategory[])
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isAboveMediumScreen = useMediaQuery('(min-width: 1060px)')

  const navItemsStyle =
    'border-b-[1px] border-solid border-secondary text-black outline-none block py-[10px] lx:py-[20px] px-[10px]'

  const isHomePage = location.pathname === '/' // Assuming the home page path is '/'

  const categoriesBox = useRef(null)
  useOnClickOutside(categoriesBox, () => {
    setIsCategoryMenuOpen(true)
  })

  const dispatch = useDispatch()
  const { isAuthorized, isAdminAuthorized } = useSelector(authSelector)
  const handleLogout = () => {
    dispatch(SET_LOGOUT())
    const toast: IToast = {
      severity: 'success',
      summary: 'Başarılı',
      detail: 'Başarıyla çıkış yaptınız.',
      life: 3000
    }
    dispatch(SET_TOAST(toast))
    navigate('/')
  }

  const getCategories = async () => {
    const [err, data] = await to(categoryService.fetchCategories())
    if (err) return console.log(err)
    setCategories(data)
  }

  const renderCategory = (category: ICategory) => (
    <div key={'category-' + category.id}>
      <a href={`/shop/${category.id}`} className={navItemsStyle + ' px-[30px] py-[8px]'}>
        {category.name}
      </a>
      {category.subCategories && (
        <div className='pl-[20px]'>{category.subCategories.map(subcategory => renderCategory(subcategory))}</div>
      )}
    </div>
  )

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className='mx-auto w-full px-4'>
      <div className='grid grid-cols-12 border-t border-solid border-secondary xl:px-12'>
        <div className='relative col-span-12 lg:col-span-3' ref={categoriesBox}>
          <Button
            data-toggle='collapse'
            id='categoriesBtn'
            className='-mt-[1] flex h-[65px]
                  w-full items-center justify-between !border-none 
                  !bg-primary px-[30px] py-0 text-black !shadow-none'
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          >
            <h6 className='m-0 font-medium'>Kategoriler</h6>
            <IoIosArrowDown className='h-5 w-5' />
          </Button>

          <nav className='relative z-10 w-full items-start border border-y-0 border-solid border-secondary p-0 focus:outline-none lg:absolute'>
            <AnimatePresence>
              {!isCategoryMenuOpen && (
                <motion.div
                  className='mb-0 flex max-h-96 w-full list-none flex-col overflow-y-auto bg-white pl-0'
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  variants={{
                    hidden: { opacity: 0, height: 0 },
                    visible: { opacity: 1, height: 'auto' }
                  }}
                >
                  {categories.map(category => renderCategory(category))}
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
        <div className='col-span-12 px-[15px] lg:col-span-9'>
          <nav className='relative flex flex-row flex-wrap items-center justify-between px-0 py-4 lg:justify-start lg:py-0'>
            <a href='/' className='block text-black lg:hidden'>
              {/* font-size: calc(1.375rem + 1.5vw); */}
              <h1 className='m-0 text-4xl font-semibold' style={{ fontSize: 'calc(1.375rem + 1.5vw)' }}>
                <span className='mr-1 border px-4 font-bold text-primary'>D</span>
                ailyShop
              </h1>
            </a>
            <button
              className='border border-solid bg-transparent px-3 py-1 text-[1.25rem] lg:hidden'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <IoIosMenu className='text-3xl text-black ' />
            </button>
            <AnimatePresence>
              {(isMobileMenuOpen || isAboveMediumScreen) && (
                <motion.div
                  className='relative block flex-grow basis-full items-center lg:flex lg:basis-auto'
                  initial={isAboveMediumScreen ? '' : 'hidden'}
                  animate='visible'
                  exit='hidden'
                  variants={{
                    hidden: { opacity: 0, height: 0 },
                    visible: { opacity: 1, height: 'auto' }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='mb-0 mr-auto mt-4 flex flex-col py-0 pl-0 lg:flex-row'>
                    <a href='/' className={navItemsStyle}>
                      Ana Sayfa
                    </a>
                    <a href='/about' className={navItemsStyle}>
                      Hakkımızda ve İletişim
                    </a>
                  </div>
                  <div className='m-5 mb-0 ml-auto flex flex-col gap-5 py-0 pl-0 lg:flex-row'>
                    {/* login register links */}

                    {/* logout */}
                    {isAuthorized ? (
                      <>
                        {isAdminAuthorized && (
                          <Link to='/admin'>
                            <Button text={location.pathname !== '/admin'} severity='help'>
                              Admin
                            </Button>
                          </Link>
                        )}
                        <Link to='/account'>
                          <Button text={location.pathname !== '/account'} severity='info'>
                            Hesap
                          </Button>
                        </Link>
                        <Link to='/seller'>
                          <Button text={location.pathname !== '/seller'} severity='warning'>
                            Satış Yap{' '}
                          </Button>
                        </Link>
                        <Button text severity='danger' onClick={handleLogout}>
                          Çıkış Yap
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to='/login'>
                          <Button text={location.pathname !== '/login'} severity='info'>
                            Giriş Yap
                          </Button>
                        </Link>
                        <Link to='/register'>
                          <Button text={location.pathname !== '/register'} severity='warning'>
                            Kayıt Ol{' '}
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
          {isHomePage && <HeaderCarousel />}
        </div>
      </div>
    </div>
  )
}

export default Navbar
