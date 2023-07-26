import { useState } from 'react';
import {
  IoIosArrowDown
} from 'react-icons/io';

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const navItemsStyle = 'border-b-[1px] border-solid border-[#EDF1FF] text-black outline-none block py-[8px] px-[30px]';

  const isHomePage = location.pathname === '/'; // Assuming the home page path is '/'

  return (
    <>
      <div className="w-full mx-auto px-4">
        <div className="grid-cols-12 grid xl:px-12 border-t border-solid border-[#EDF1FF]">
          <div className="col-span-3 lg:block">
            <a href="#" data-toggle="collapse" role="button" id="categoriesBtn"
              className="flex items-center justify-between
              bg-[#D19C97] text-black shadow-none 
              w-full h-[65px] -mt-[1] py-0 px-[30px]" onClick={toggleMenu}>
              <h6 className="m-0">
                Categories
              </h6>
              <IoIosArrowDown className="h-5 w-5" />
            </a>
            <div className="relative z-10 focus:outline-none items-start p-0 border border-y-0 border-solid border-[#EDF1FF]">
              <div className={`overflow-hidden w-full flex flex-col pl-0 mb-0 list-none transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-0' : 'max-h-[500px]'} `}>
                <a href="" className={navItemsStyle}>Shirts</a>
                <a href="" className={navItemsStyle}>Jeans</a>
                <a href="" className={navItemsStyle}>T-Shirts</a>
                <a href="" className={navItemsStyle}>Dresses</a>
                <a href="" className={navItemsStyle}>Tops</a>
                <a href="" className={navItemsStyle}>Skirts</a>
                <a href="" className={navItemsStyle}>Shoes</a>
                <a href="" className={navItemsStyle}>Bags</a>
                <a href="" className={navItemsStyle}>Accessories</a>

              </div>
              

            </div>
          </div>
          <div className="col-span-9">

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
