import useMediaQuery from '@/hooks/useMedia'
import { useRef, useState } from 'react'

import { IoIosArrowDown, IoIosMenu } from 'react-icons/io'
import HeaderCarousel from './Header/HeaderCarousel'
import { useOnClickOutside } from 'usehooks-ts'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from 'primereact/button'
import { useGetCategories } from '@/services/category/category.service'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CategoryTree from './categoryTree'
import NavbarLink from './navbarLink'

const Navbar = () => {
  const pathName = usePathname()

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isAboveMediumScreen = useMediaQuery('(min-width: 1060px)')
  const { data: categoryData } = useGetCategories()

  const isHomePage = pathName === '/'

  const categoriesBox = useRef(null)
  useOnClickOutside(categoriesBox, () => {
    setIsCategoryMenuOpen(true)
  })

  const { isAuthorized, isAdminAuthorized, logout } = useAuth()

  const handleLogout = () => logout()

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
                  {categoryData?.data.map(category => <CategoryTree category={category} key={category.id} />)}
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
        <div className='col-span-12 px-[15px] lg:col-span-9'>
          <nav className='relative flex flex-row flex-wrap items-center justify-between px-0 py-4 lg:justify-start lg:py-0'>
            <Link href='/' className='block text-black lg:hidden'>
              {/* font-size: calc(1.375rem + 1.5vw); */}
              <h1 className='m-0 text-4xl font-semibold' style={{ fontSize: 'calc(1.375rem + 1.5vw)' }}>
                <span className='mr-1 border px-4 font-bold text-primary'>D</span>ailyShop
              </h1>
            </Link>
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
                    <NavbarLink href='/'>Ana Sayfa</NavbarLink>
                    <NavbarLink href='/about-us'>Hakkımızda ve İletişim</NavbarLink>
                  </div>
                  <div className='m-5 mb-0 ml-auto flex flex-col gap-5 py-0 pl-0 lg:flex-row'>
                    {/* login register links */}

                    {/* logout */}
                    {isAuthorized ? (
                      <>
                        {isAdminAuthorized && (
                          <Link href='/admin/settings'>
                            <Button text={!pathName.includes('admin')} severity='help'>
                              Admin
                            </Button>
                          </Link>
                        )}
                        <Link href='/account/user-info'>
                          <Button text={!pathName.includes('/account')} severity='info'>
                            Hesap
                          </Button>
                        </Link>
                        <Link href='/seller'>
                          <Button text={pathName !== '/seller'} severity='warning'>
                            Satış Yap{' '}
                          </Button>
                        </Link>
                        <Button text severity='danger' onClick={handleLogout}>
                          Çıkış Yap
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href='/login'>
                          <Button text={pathName !== '/login'} severity='info'>
                            Giriş Yap
                          </Button>
                        </Link>
                        <Link href='/register'>
                          <Button text={pathName !== '/register'} severity='warning'>
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
