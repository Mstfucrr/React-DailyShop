
const Coupon = () => {
    return (
        <form action="" className="mb-12">
            <div className="relative flex flex-wrap w-full items-stretch">
                <input className="relative flex-auto p-6 border border-solid outline-none border-secondary
                                    text-[#212529] placeholder-[#212529] placeholder-opacity-50
                                    h-[50px] "
                    type="text" placeholder="Coupon code" />
                <div className="-ml-[1px] flex">
                    <button className="bg-primary border border-solid border-transparent text-[#212529] py-[0.375rem] px-3">
                        Apply Coupon
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Coupon