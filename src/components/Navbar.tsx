import useMediaQuery from '@/hooks/useMedia';
import { useRef, useState } from 'react';
import carousel1  from '@/assets/images/carousel-1.jpg';
import carousel2  from '@/assets/images/carousel-2.jpg';
import {
  IoIosArrowDown, IoIosMenu
} from 'react-icons/io';
import HeaderCarousel from './Header/HeaderCarousel';
import { useOnClickOutside } from 'usehooks-ts';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)");

  const navItemsStyle = 'border-b-[1px] border-solid border-secondary text-black outline-none block';

  const isHomePage = location.pathname === '/'; // Assuming the home page path is '/'
  
  const categoriesBox = useRef(null);
  useOnClickOutside(categoriesBox, () => {
    setIsCategoryMenuOpen(true);
  });


  return (
    <>
      <div className="w-full mx-auto px-4">
        <div className="grid-cols-12 grid xl:px-12 border-t border-solid border-secondary">
          <div className="lg:col-span-3 col-span-12"
            ref={categoriesBox}
          >
            <a href="#" data-toggle="collapse" role="button" id="categoriesBtn"

              className="flex items-center justify-between
                  bg-primary text-black shadow-none 
                  w-full h-[65px] -mt-[1] py-0 px-[30px]" onClick={
                () => setIsCategoryMenuOpen(!isCategoryMenuOpen)
              }>
              <h6 className="m-0 font-medium">
                Categories
              </h6>
              <IoIosArrowDown className="h-5 w-5" />
            </a>
            <nav className="lg:absolute relative z-10 focus:outline-none items-start p-0 border border-y-0 border-solid border-secondary">
              <div className={`overflow-hidden w-full flex flex-col pl-0 mb-0 list-none transition-all duration-500 ease-in-out ${isCategoryMenuOpen ? 'max-h-0' : 'max-h-[500px]'} `}>
                <a href="" className={navItemsStyle + " py-[8px] px-[30px]"}>Shirts</a>
                <a href="" className={navItemsStyle + " py-[8px] px-[30px]"}>Jeans</a>
                <a href="" className={navItemsStyle + " py-[8px] px-[30px]"}>T-Shirts</a>
                <a href="" className={navItemsStyle + " py-[8px] px-[30px]"}>Dresses</a>
                <a href="" className={navItemsStyle + " py-[8px] px-[30px]"}>Tops</a>
                <a href="" className={navItemsStyle + " py-[8px] px-[30px]"}>Skirts</a>
                <a href="" className={navItemsStyle + " py-[8px] px-[30px]"}>Shoes</a>
                <a href="" className={navItemsStyle + " py-[8px] px-[30px]"}>Bags</a>
                <a href="" className={navItemsStyle + " py-[8px] px-[30px]"}>Accessories</a>
              </div>
            </nav>
          </div>
          <div className="lg:col-span-9 col-span-12 px-[15px]">
            <nav className="lg:py-0 py-4 px-0 flex-row flex-wrap lg:justify-start justify-between flex items-center relative">
              <a href="" className="block lg:hidden text-black">
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
              <div className={`basis-full lg:flex lg:basis-auto flex-grow items-center transition-all duration-500 ease-in-out ${isMobileMenuOpen || isAboveMediumScreen ? 'block' : 'hidden'}`}>
                <div className="lg:flex-row mr-auto py-0 flex flex-col pl-0 mb-0 mt-4">
                  <a href="/" className={navItemsStyle + " py-[10px] lx:py-[20px] px-[10px]"}>Home</a>
                  <a href="" className={navItemsStyle + " py-[10px] lx:py-[20px] px-[10px]"}>Shop</a>
                  <a href="" className={navItemsStyle + " py-[10px] lx:py-[20px] px-[10px]"}>Shop Detail</a>
                  <a href="" className={navItemsStyle + " py-[10px] lx:py-[20px] px-[10px]"}>Pages</a>
                  <a href="" className={navItemsStyle + " py-[10px] lx:py-[20px] px-[10px]"}>Contact</a>
                </div>
                <div className="lg:flex-row ml-auto py-0 flex flex-col pl-0 mb-0">
                  {/* login register links */}
                  <Link to="/login" className={navItemsStyle + " py-[10px] lx:py-[20px] px-[10px]"}>Login</Link>
                  <Link to="/register" className={navItemsStyle + " py-[10px] lx:py-[20px] px-[10px]"}>Register</Link>
                  
                </div>
              </div>
            </nav>
            { isHomePage &&
              <HeaderCarousel images={[carousel1,carousel2]} />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
