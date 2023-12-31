import useMediaQuery from '@/hooks/useMedia';
import { useEffect, useRef, useState } from 'react';

import {
  IoIosArrowDown, IoIosMenu
} from 'react-icons/io';
import HeaderCarousel from './Header/HeaderCarousel';
import { useOnClickOutside } from 'usehooks-ts';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from 'primereact/button';
import { authSelector, SET_LOGOUT } from '@/store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TOAST } from '@/store/Toast';
import { IToast } from '@/store/Toast/type';
import categoryService from '@/services/category/category.service';
import to from 'await-to-js';
import { ICategory } from '@/shared/types';


const Navbar = () => {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([] as ICategory[])
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)");

  const navItemsStyle = 'border-b-[1px] border-solid border-secondary text-black outline-none block py-[10px] lx:py-[20px] px-[10px]';

  const isHomePage = location.pathname === '/'; // Assuming the home page path is '/'

  const categoriesBox = useRef(null);
  useOnClickOutside(categoriesBox, () => {
    setIsCategoryMenuOpen(true);
  });

  const dispatch = useDispatch()
  const { isAuthorized, isAdminAuthorized } = useSelector(authSelector)
  const handleLogout = () => {
    dispatch(SET_LOGOUT())
    const toast: IToast = { severity: "success", summary: "Başarılı", detail: "Başarıyla çıkış yaptınız.", life: 3000 }
    dispatch(SET_TOAST(toast))
    navigate('/')
  }

  const getCategories = async () => {
    const [err, data] = await to(categoryService.fetchCategories())
    if (err) return console.log(err)
    setCategories(data)
  }

  const renderCategory = (category: ICategory) => (
    <div key={"category-" + category.id}>
      <a href={`/shop/${category.id}`} className={navItemsStyle + " py-[8px] px-[30px]"}>{category.name}</a>
      {category.subCategories && (
        <div className="pl-[20px]">
          {category.subCategories.map((subcategory) => renderCategory(subcategory))}
        </div>
      )}
    </div>
  );

  useEffect(() => {
    getCategories()
  }, [])

  return (
      <div className="w-full mx-auto px-4">
        <div className="grid-cols-12 grid xl:px-12 border-t border-solid border-secondary">
          <div className="lg:col-span-3 col-span-12 relative"
            ref={categoriesBox}
          >
            <Button data-toggle="collapse" id="categoriesBtn"
              className="flex items-center justify-between
                  !bg-primary text-black !shadow-none !border-none 
                  w-full h-[65px] -mt-[1] py-0 px-[30px]" 
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}>
              <h6 className="m-0 font-medium">
                Kategoriler
              </h6>
              <IoIosArrowDown className="h-5 w-5" />
            </Button>

            < nav className="lg:absolute w-full relative z-10 focus:outline-none items-start p-0 border border-y-0 border-solid border-secondary">
              <AnimatePresence>
                {!isCategoryMenuOpen && (
                  <motion.div className="bg-white overflow-y-auto w-full max-h-96 flex flex-col pl-0 mb-0 list-none"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, height: 0 },
                      visible: { opacity: 1, height: 'auto' }
                    }}
                  >
                    {categories.map((category) => renderCategory(category))}

                  </motion.div>
                )}
              </AnimatePresence>
            </nav>

          </div>
          <div className="lg:col-span-9 col-span-12 px-[15px]">
            <nav className="lg:py-0 py-4 px-0 flex-row flex-wrap lg:justify-start justify-between flex items-center relative">
              <a href="/" className="block lg:hidden text-black">
                {/* font-size: calc(1.375rem + 1.5vw); */}
                <h1 className="m-0 text-4xl font-semibold" style={{ fontSize: 'calc(1.375rem + 1.5vw)' }}>
                  <span className="text-primary font-bold border px-4 mr-1">D</span>
                  ailyShop
                </h1>
              </a>
              <button className='py-1 px-3 text-[1.25rem] bg-transparent border border-solid lg:hidden'

                onClick={
                  () => setIsMobileMenuOpen(!isMobileMenuOpen)
                }
              >
                <IoIosMenu className="text-3xl text-black " />
              </button>
              <AnimatePresence>
                {(isMobileMenuOpen || isAboveMediumScreen) && (
                  <motion.div className="basis-full block lg:flex lg:basis-auto flex-grow items-center relative"
                    initial={isAboveMediumScreen ? "" : "hidden"}
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, height: 0 },
                      visible: { opacity: 1, height: 'auto' }
                    }}
                    transition={{ duration: .3 }}

                  >
                    <div className="lg:flex-row mr-auto py-0 flex flex-col pl-0 mb-0 mt-4">
                      <a href="/" className={navItemsStyle}>Ana Sayfa</a>
                      <a href="/about" className={navItemsStyle}>Hakkımızda ve İletişim</a>
                    </div>
                    <div className="lg:flex-row ml-auto py-0 flex flex-col pl-0 mb-0 gap-5 m-5">
                      {/* login register links */}

                      {/* logout */}
                      {isAuthorized ?
                        <>
                          {isAdminAuthorized && <Link to="/admin"><Button text={location.pathname !== '/admin'} severity='help' >Admin</Button></Link> }
                          <Link to="/account"><Button text={location.pathname !== '/account'} severity='info' >Hesap</Button></Link>
                          <Link to="/seller"><Button text={location.pathname !== '/seller'} severity='warning' >Satış Yap </Button></Link>
                          <Button text severity='danger' onClick={handleLogout} >Çıkış Yap</Button>
                        </>
                        :
                        <>
                          <Link to="/login"><Button text={location.pathname !== '/login'} severity='info' >Giriş Yap</Button></Link>
                          <Link to="/register"><Button text={location.pathname !== '/register'} severity='warning' >Kayıt Ol </Button></Link>
                        </>
                      }


                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
            {isHomePage &&
              <HeaderCarousel />
            }
          </div>
        </div>
      </div>
  );
};

export default Navbar;
