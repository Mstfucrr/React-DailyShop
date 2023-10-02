import { FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Searchbar = () => {

    const navigate = useNavigate()
    return (
        <div className="px-[15px] mx-auto w-full">
            <div className="grid grid-cols-12 items-center py-4 xl:px-12">
                {/* col-lg-3 d-none d-lg-block */}
                <div className="col-span-3 hidden lg:block">
                    {/* text-decoration-none */}
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <h1 className="m-0 font-semibold text-4xl text-black">
                            <span className="text-primary font-bold border px-3 mr-1">D</span>
                            aily Shop

                        </h1>
                    </a>
                </div>
                {/* col-lg-6 col-6 text-left */}
                <div className="lg:col-span-6 col-span-6 text-left px-[15px]">
                    <form action="">
                        {/* input-group */}
                        <div className="relative flex flex-wrap w-full">
                            {/* form-control height calc(1.5em + 0.75rem + 2px) */}
                            <input type="text" className="
                    relative flex-[1_1_auto] block py-[.375rem] px-3 border border-solid border-secondary rounded-none
                    h-[calc(1.5em + 0.75rem + 2px)] text-[#495057]
                    focus:outline-none w-[1%]" placeholder='Search for products' />
                            {/* input-group-append */}
                            <div className="flex items-center ">
                                <span className="text-primary px-3 py-2 rounded-none border border-solid border-secondary">
                                    <FaSearch className="h-5 w-5" />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
                {/* col-lg-3 col-6 text-right */}
                <div className="lg:col-span-3 col-span-6 text-right">
                    <button className="border border-secondary inline-block text-center rounded-none select-none py-[.375rem] px-3 align-middle mr-1">
                        <FaHeart className="h-4 w-4 inline-block text-primary" />
                        <span className="inline-block py-[.25em] px-[.6em] font-bold text-[75%] relative -top-[1px]">0</span>
                    </button>
                    <button className="border border-secondary inline-block text-center rounded-none select-none py-[.375rem] px-3 align-middle"
                        onClick={() => navigate('/cart')}
                    >
                        <FaShoppingCart className="h-4 w-4 inline-block text-primary" />
                        <span className="inline-block py-[.25em] px-[.6em] font-bold text-[75%] relative -top-[1px]">0</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Searchbar