import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

import { IoChevronForwardSharp, IoMailSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="w-full px-[15px] mx-auto text-black pt-12 bg-secondary">            
            <div className="grid xl:px-12 py-10 lg:grid-rows-1 md:grid-rows-2 grid-rows-3 lg:grid-cols-3 grid-cols-1 gap-x-10">

                <div className="">
                    <a href="/" className="text-black">
                        {/* font-size: calc(1.375rem + 1.5vw); */}
                        <h1 className="m-0 sm:text-4xl font-semibold text-2xl mb-4">
                            <span className="text-primary font-bold border px-4 mr-1">D</span>
                            ailyShop
                        </h1>
                    </a>
                    <p className='mb-2'>
                        Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.
                    </p>
                    <p className="mb-2">
                        <FaMapMarkerAlt className='text-primary inline mr-2' />
                        123 Street, New York, USA
                    </p>
                    <p className="mb-2">
                        <IoMailSharp className='text-primary inline mr-2' />
                        info@example.com
                    </p>
                    <div className="mb-2">
                        <FaPhone className='text-primary inline mr-2' />
                        +012 345 67890
                    </div>
                </div>

                <div className="col-span-2 grid md:grid-cols-3 grid-cols-1 grid-rows-1 row-span-2 md:row-span-1 gap-y-3">
                    <div className="">
                        <h5 className="font-bold text-xl text-black mb-6">Hızlı Linkler</h5>
                        <div className="flex flex-col justify-start">

                            <Link to="/" className="mb-2 max-w-fit hover:underline">
                                <IoChevronForwardSharp className='inline mb-1 font-bold mr-1' />Ana Sayfa</Link>

                            <Link to="/shop" className="mb-2 max-w-fit hover:underline">
                                <IoChevronForwardSharp className='inline mb-1 font-bold mr-1' />Mağaza</Link>

                        </div>
                    </div>
                    <div className="">
                        <h5 className="font-bold text-xl text-black mb-6">Hızlı Linkler</h5>
                        <div className="flex flex-col justify-start">

                            <Link to="/" className="mb-2 max-w-fit hover:underline">
                                <IoChevronForwardSharp className='inline mb-1 font-bold mr-1' />Ana Sayfa</Link>

                            <Link to="/shop" className="mb-2 max-w-fit hover:underline">
                                <IoChevronForwardSharp className='inline mb-1 font-bold mr-1' />Mağaza</Link>

                        </div>
                    </div>
                    <div className="">
                        <h5 className='font-bold mb-6 text-2xl'>Newsletter</h5>
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

                        <form action="">
                            <div className="flex flex-col gap-4">
                                <InputText placeholder="Your Name" className='border-0 py-4' />
                                <InputText placeholder="Your Email" className='border-0 py-4' />
                                <Button label="Subscribe Now" className='border-0 py-3' />
                            </div>


                        </form>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer   