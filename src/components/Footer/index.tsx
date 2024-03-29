import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

import { IoChevronForwardSharp, IoMailSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mx-auto mt-36 w-full bg-secondary px-[15px] pt-12 text-black'>
      <div className='grid grid-cols-1 grid-rows-3 gap-x-10 py-10 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 xl:px-12'>
        <div className=''>
          <a href='/' className='text-black'>
            {/* font-size: calc(1.375rem + 1.5vw); */}
            <h1 className='m-0 mb-4 text-2xl font-semibold sm:text-4xl'>
              <span className='mr-1 border px-4 font-bold text-primary'>D</span>
              ailyShop
            </h1>
          </a>
          <p className='mb-2'>
            Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore
            amet erat.
          </p>
          <p className='mb-2'>
            <FaMapMarkerAlt className='mr-2 inline text-primary' />
            123 Street, New York, USA
          </p>
          <p className='mb-2'>
            <IoMailSharp className='mr-2 inline text-primary' />
            info@example.com
          </p>
          <div className='mb-2'>
            <FaPhone className='mr-2 inline text-primary' />
            +012 345 67890
          </div>
        </div>

        <div className='col-span-2 row-span-2 grid grid-cols-1 grid-rows-1 gap-y-3 md:row-span-1 md:grid-cols-3'>
          <div className=''>
            <h5 className='mb-6 text-xl font-bold text-black'>Hızlı Linkler</h5>
            <div className='flex flex-col justify-start'>
              <Link to='/' className='mb-2 max-w-fit hover:underline'>
                <IoChevronForwardSharp className='mb-1 mr-1 inline font-bold' />
                Ana Sayfa
              </Link>

              <Link to='/shop' className='mb-2 max-w-fit hover:underline'>
                <IoChevronForwardSharp className='mb-1 mr-1 inline font-bold' />
                Mağaza
              </Link>
            </div>
          </div>
          <div className=''>
            <h5 className='mb-6 text-xl font-bold text-black'>Hızlı Linkler</h5>
            <div className='flex flex-col justify-start'>
              <Link to='/' className='mb-2 max-w-fit hover:underline'>
                <IoChevronForwardSharp className='mb-1 mr-1 inline font-bold' />
                Ana Sayfa
              </Link>

              <Link to='/shop' className='mb-2 max-w-fit hover:underline'>
                <IoChevronForwardSharp className='mb-1 mr-1 inline font-bold' />
                Mağaza
              </Link>
            </div>
          </div>
          <div className=''>
            <h5 className='mb-6 text-2xl font-bold'>Newsletter</h5>
            {/* 
                            <form action="">
                            <div class="form-group">
                                <input type="text" class="form-control border-0 py-4" placeholder="Your Name" required="required">
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control border-0 py-4" placeholder="Your Email" required="required">
                            </div>
                            <div>
                                <button class="btn btn-primary btn-block border-0 py-3" type="submit">Subscribe Now</button>
                            </div>
                        </form>
                            */}

            <form action=''>
              <div className='flex flex-col gap-4'>
                <InputText placeholder='Your Name' className='border-0 py-4' />
                <InputText placeholder='Your Email' className='border-0 py-4' />
                <Button label='Subscribe Now' className='border-0 py-3' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
