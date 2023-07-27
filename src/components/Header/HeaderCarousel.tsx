import React, { useState } from 'react'

type Props = {
    images: string[]
}

const HeaderCarousel = ({ images }: Props) => {

    const [activeSlide, setActiveSlide] = useState(1);

    const handlePrevSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
    };

    const handleNextSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % images.length);
    };
    return (
        <div className="touch-pan-y relative">
            <div className="relative w-full overflow-hidden">
                {/* 
    position: relative;
    display: none;
    float: left;
    width: 100%;
    margin-right: -100%;
    backface-visibility: hidden;
    transition: transform 0.6s ease-in-out;     
 */}
                <div className="relative w-full flex">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={` flex-shrink-0 flex-grow-0 flex relative h-[410px] transition-all duration-500 ${
                                index === activeSlide ? 'opacity-100 w-full' : 'opacity-0 w-0'
                            }`}
                        >
                            <img src={image} alt="" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center">
                    <button className="bg-[#D19C97] text-black shadow-none w-[40px] h-[40px] rounded-full flex items-center justify-center" onClick={handlePrevSlide}>
                        <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button className="bg-[#D19C97] text-black shadow-none w-[40px] h-[40px] rounded-full flex items-center justify-center" onClick={handleNextSlide}>
                        <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeaderCarousel