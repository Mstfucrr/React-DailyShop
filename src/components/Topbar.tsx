import {
    FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube
} from 'react-icons/fa'


const Topbar = () => {

    return (
        <div className='px-[15px]'>
            {/* row bg-secondary py-2 px-xl-5 */}
            <div className="grid-cols-12 grid bg-secondary py-2 xl:px-[3rem] flex-wrap -mx-[15px]">
                {/* col-lg-6 d-none d-lg-block */}
                <div className="lg:col-span-6 hidden lg:block px-[15px]">
                    <div className="inline-flex items-center">
                        <div className="text-black">FAQs</div>
                        <span className="text-[#6c757d] px-2">|</span>
                        <div className="text-black">Help</div>
                        <span className="text-[#6c757d] px-2">|</span>
                        <div className="text-black">Support</div>
                    </div>
                </div>
                {/* col-lg-6 text-center text-lg-right */}
                <div className="lg:col-span-6 col-span-12 text-center lg:text-right px-[15px]">
                    <div className="inline-flex items-center">
                        <a href="" className="text-black px-2">
                            <FaFacebookF />
                        </a>
                        <a href="" className="text-black px-2">
                            <FaTwitter />
                        </a>
                        <a href="" className="text-black px-2">
                            <FaLinkedinIn />
                        </a>
                        <a href="" className="text-black px-2">
                            <FaInstagram />
                        </a>
                        <a href="" className="text-black px-2">
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Topbar