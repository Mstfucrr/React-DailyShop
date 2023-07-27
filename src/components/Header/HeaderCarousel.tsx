import React, { useState } from 'react'
import {
    MdArrowBackIosNew, MdArrowForwardIos
} from 'react-icons/md';

type Props = {
    images: string[]
}

const HeaderCarousel = ({ images }: Props) => {

    const [activeSlide, setActiveSlide] = useState(1);

    const handlePrevSlide = (e : React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setActiveSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
    };

    const handleNextSlide = (e : React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setActiveSlide((prevSlide) => (prevSlide + 1) % images.length);
    };
    return (
        <div className="touch-pan-y relative">
            <div className="relative w-full overflow-hidden">
                <div className="relative w-full flex">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={` flex-shrink-0 flex-grow-0 flex relative h-[410px] transition-all duration-500 ${index === activeSlide ? 'opacity-100 w-full' : 'opacity-0 w-0'
                                }`}
                        >
                            <img src={image} alt="" className="w-full h-full object-cover" />
                            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-30"></div>
                            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <h1 className="text-4xl font-semibold mb-4">New Collection</h1>
                                    <p className="text-lg mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                                    <a href="" className="inline-block bg-[#1C1C1C] text-center align-middle border border-solid border-transparent py-[.375rem] px-3
                                    hover:bg-[#fff] hover:text-[#1C1C1C] transition-all duration-100
                                    ">
                                        Shop Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <a href="" className="absolute top-0 bottom-0 flex items-center justify-center w-[15%] text-white text-center opacity-50 left-0
                hover:opacity-90 transition-all duration-100"
                    onClick={(e) => {
                        handlePrevSlide(e);
                    }}>
                    <div className="inline-block bg-[#1C1C1C] text-center align-middle border border-solid border-transparent py-[.375rem] px-3">
                        <MdArrowBackIosNew className="h-7 w-6" />
                    </div>
                </a>
                <a href="" className="absolute top-0 bottom-0 flex items-center justify-center w-[15%] text-white text-center opacity-50 right-0
                hover:opacity-90 transition-all duration-100"
                    onClick={(e) => {
                        handleNextSlide(e);
                    }}>
                    <div className="inline-block bg-[#1C1C1C] text-center align-middle border border-solid border-transparent py-[.375rem] px-3">
                        <MdArrowForwardIos className="h-7 w-6" />
                    </div>
                </a>

            </div>
        </div>
    )
}

export default HeaderCarousel