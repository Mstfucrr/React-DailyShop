import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa'

const Topbar = () => {
  return (
    <div className='px-[15px]'>
      {/* row bg-secondary py-2 px-xl-5 */}
      <div className='-mx-[15px] grid grid-cols-12 flex-wrap bg-secondary py-2 xl:px-[3rem]'>
        {/* col-lg-6 d-none d-lg-block */}
        <div className='hidden px-[15px] lg:col-span-6 lg:block'>
          <div className='inline-flex items-center'>
            <div className='text-black'>FAQs</div>
            <span className='px-2 text-[#6c757d]'>|</span>
            <div className='text-black'>Help</div>
            <span className='px-2 text-[#6c757d]'>|</span>
            <div className='text-black'>Support</div>
          </div>
        </div>
        {/* col-lg-6 text-center text-lg-right */}
        <div className='col-span-12 px-[15px] text-center lg:col-span-6 lg:text-right'>
          <div className='inline-flex items-center'>
            <Link href='' className='px-2 text-black'>
              <FaFacebookF />
            </Link>
            <Link href='' className='px-2 text-black'>
              <FaTwitter />
            </Link>
            <Link href='' className='px-2 text-black'>
              <FaLinkedinIn />
            </Link>
            <Link href='' className='px-2 text-black'>
              <FaInstagram />
            </Link>
            <Link href='' className='px-2 text-black'>
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
