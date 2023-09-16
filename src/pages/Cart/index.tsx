import CartList from "@/components/Cart/CartList"
import Coupon from "@/components/Cart/Coupon"
import PageBanner from "@/components/Header/PageBanner"
import Navbar from "@/components/Navbar"
import Searchbar from "@/components/Searchbar"
import Topbar from "@/components/Topbar"



const index = () => {



    return (
        <>
            <Topbar />
            <Searchbar />
            <Navbar />
            <PageBanner title="ALIŞVERİŞ SEPETİ" link="/cart" />
            <div className="grid lg:grid-rows-1 grid-rows-2 grid-flow-col lg:px-16 gap-9 mt-24 px-[15px]">
                <div className="grid lg:col-span-12 col-span-12">
                    <CartList />
                </div>
                <div className="grid lg:col-span-4 col-span-12">
                    <Coupon />
                    {/* card */}
                    <div className="mb-12 border border-solid border-secondary
                        flex flex-col relative">
                        {/* card header */}
                        <div className="py-3 px-5 bg-secondary">
                            <h4 className="font-semibold text-2xl text-black">
                                Sepet Özeti
                            </h4>
                        </div>
                        {/* card body */}
                        <div className="flex-auto p-5">
                            <div className="flex justify-between mb-4 pt-1">
                                <h6 className="font-medium text-black">
                                    Ara Toplam
                                </h6>
                                <h6 className="font-medium text-black">
                                    $100.00
                                </h6>
                            </div>
                            <div className="flex justify-between ">
                                <h6 className="font-medium text-black">
                                    Nakliye
                                </h6>
                                <h6 className="font-medium text-black">
                                    $10.00
                                </h6>
                            </div>
                        </div>
                        {/* card footer */}
                        <div className="border border-solid border-secondary py-3 px-5">
                            <div className="flex justify-between mt-2 text-black">
                                <h5 className="font-bold text-xl">
                                    Toplam
                                </h5>
                                <h5 className="font-bold text-xl">
                                    $110.00
                                </h5>
                            </div>
                            <button className="bg-primary border border-solid border-transparent text-[#212529] py-4 px-3 mt-4 w-full
                                hover:bg-primaryDark hover:border-primaryDark hover:text-white
                                transition duration-300 ease-in-out
                            ">
                                Ödeme İşlemine Geçin
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default index