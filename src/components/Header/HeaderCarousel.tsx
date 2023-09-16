// import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import carousel1  from '@/assets/images/carousel-1.jpg';
import carousel2  from '@/assets/images/carousel-2.jpg';


const HeaderCarousel = () => {

    
    const slide = [
        {
            img: carousel1,
            title: 'New Collection',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        },
        {
            img: carousel2,
            title: 'New Collection',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        },
    ];

    return (
        <div className="relative w-full overflow-hidden mt-1">
            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                }}
                speed={700}
                
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                modules={[Navigation, Pagination, Autoplay]}
                className="h-[410px]"
            >
                {slide.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.img} alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                            <h1 className="text-white text-4xl font-bold">{item.title}</h1>
                            <p className="text-white font-semibold xl:text-2xl md:text-lg text-sm text-center">
                                {item.description}
                            </p>
                            <button className="px-8 py-3 bg-white text-black text-lg font-semibold mt-5 hover:bg-black hover:text-white hover:cursor-pointer hover:transition-all hover:duration-150">Shop Now</button>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-button-prev h-full top-[5%] w-[13%]
                        after:bg-black after:opacity-50 after:content-['prev'] after:text-white after:text-[30px] after:p-3
                        after:hover:opacity-90 after:hover:cursor-pointer after:transition-all after:duration-150
                    "></div>

                <div className="swiper-button-next h-full top-[5%] w-[13%]
                        after:bg-black after:opacity-50 after:content-['next'] after:text-white after:text-[30px] after:p-3
                        after:hover:opacity-90 after:hover:cursor-pointer after:transition-all after:duration-150
                    "></div>
                
            </Swiper>
        </div>

    )
}

export default HeaderCarousel